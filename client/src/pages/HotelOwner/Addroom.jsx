import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Addroom = () => {
    const { axios, getToken } = useAppContext();
    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null,
    });
    const [input, setInput] = useState({
        roomType: '',
        PricePerNighte: 0,
        amenities: {
            'Free Wifi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false,
        }
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setInput(prevInput => ({ ...prevInput, [name]: value }));
    }

    const onAmenityChange = (e) => {
        const { name, checked } = e.target;
        setInput(prevInput => ({
            ...prevInput,
            amenities: {
                ...prevInput.amenities,
                [name]: checked
            }
        }));
    }

    const [loading, setLoading] = useState(false);

    const onSubmitHandeler = async (e) => {
        e.preventDefault();
        if (
  !input.roomType ||
  !input.PricePerNighte ||
  !Object.values(input.amenities).some(val => val) ||
  !Object.values(images).some(image => image)
) {
  toast.error("Please fill in all the details");
  return; // prevent form from continuing
}
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('roomType', input.roomType);
            formData.append("pricePerNight", input.PricePerNighte);
            const amenities = Object.keys(input.amenities).filter(key => input.amenities[key]);
            formData.append('amenities', JSON.stringify(amenities));

            Object.keys(images).forEach((key) => {
                images[key] && formData.append('images', images[key]);
            });
           

            const { data } = await axios.post(`/api/rooms/`, formData, { headers: { Authorization: `Bearer ${await getToken()}` } });

            if (data.success) {
                toast.success(data.message);
                setInput({
                    roomType: '',
                    PricePerNighte: 0,
                    amenities: {
                        'Free Wifi': false,
                        'Free Breakfast': false,
                        "Room service": false,
                        "Mountain View": false,
                        'Pool Access': false
                    }
                });
                setImages({ 1: null, 2: null, 3: null, 4: null });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="add-room-container">
                <form onSubmit={onSubmitHandeler} className="add-room-form">
                    <h1 className="form-title">Add Room</h1>
                    <p className="section-label">Upload Images (up to 4)</p>
                    <div className="image-grid">
                        {Object.keys(images).map((key) => (
                            <label key={key} htmlFor={`roomImage${key}`} className="image-preview-label">
                                <img
                                    src={images[key] ? URL.createObjectURL(images[key]) : assets.addIcon}
                                    alt={`Upload Preview ${key}`}
                                    className="image-preview"
                                />
                            </label>
                        ))}
                        {/* Hidden inputs are kept separate for clarity and to avoid re-rendering them inside the label */}
                        {Object.keys(images).map((key) => (
                            <input
                                key={`input-${key}`}
                                type='file'
                                accept='image/*'
                                id={`roomImage${key}`}
                                hidden
                                onChange={e => setImages({ ...images, [key]: e.target.files[0] })}
                            />
                        ))}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="roomType" className="form-label">Room Type</label>
                            <select id="roomType" name="roomType" value={input.roomType} onChange={e => setInput({ ...input, roomType: e.target.value })} className="form-select">
                                <option value="">Select a room type</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Suite">Suite</option>
                                <option value="Suite">Luxury</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="PricePerNighte" className="form-label">Price Per Night ($)</label>
                            <input type="number" id="PricePerNighte" name="PricePerNighte" value={input.PricePerNighte} onChange={onChangeHandler} className="form-input" placeholder='e.g., 100' />
                        </div>
                    </div>

                    <div className="form-group">
                        <p className="form-label">Amenities</p>
                        <div className="amenities-grid">
                            {Object.keys(input.amenities).map((amenity, index) => (
                                <label key={amenity} htmlFor={amenity} className="amenity-label">
                                    <input
                                        type="checkbox"
                                        id={`amenity${index + 1}`}
                                        name={amenity}
                                        checked={input.amenities[amenity]}
                                        onChange={() => setInput({ ...input, amenities: { ...input.amenities, [amenity]: !input.amenities[amenity] } })}
                                        className="amenity-checkbox"
                                    />
                                    {amenity}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="submit-btn">{loading ? "Adding..." : "Add Room"}</button>
                </form>
            </div>
        </>
    )
}

export default Addroom;
