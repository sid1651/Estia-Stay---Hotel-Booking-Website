import React, { useMemo, useState } from 'react';
import { assets, facilityIcons, roomsDummyData } from '../assets/assets';
import { useNavigate, useSearchParams } from 'react-router';
import StarRating from '../components/StarRating';
import { useAppContext } from '../context/AppContext';

const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // fixed typo
  const { rooms, navigate, currency } = useAppContext();
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    roomType: [],
    priceRange: [],
  });
  const [selectedsort, setSelectedSort] = useState('');

  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[type].push(value);
      } else {
        updatedFilters[type] = updatedFilters[type].filter(item => item !== value);
      }
      return updatedFilters;
    });
  };

  const handelSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };

  const matchesRoomType = (room) => {
    return selectedFilters.roomType.length === 0 || selectedFilters.roomType.includes(room.roomType);
  };

  const matchesPriceRange = (room) => {
    return selectedFilters.priceRange.length === 0 || selectedFilters.priceRange.some(range => {
      const [min, max] = range.split(' to ').map(Number);
      return room.pricePerNight >= min && room.pricePerNight <= max;
    });
  };

  const sortRooms = (a, b) => {
    if (selectedsort === 'Price Low to High') {
      return a.pricePerNight - b.pricePerNight;
    } else if (selectedsort === "Price High to Low") {
      return b.pricePerNight - a.pricePerNight;
    } else if (selectedsort === 'Newest First') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  };

  const filterDestination = (room) => {
    const destination = searchParams.get('destination');
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  };

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => matchesRoomType(room) && matchesPriceRange(room) && filterDestination(room)).sort(sortRooms);
  }, [rooms, selectedFilters, selectedsort, searchParams]);

  const clearFilters = () => {
    setSelectedFilters({
      roomType: [],
      priceRange: []
    });
    setSelectedSort('');
    setSearchParams({}); // fixed typo
  };

  // ✅ Fixed RadioButton prop typo
  const CheckBox = ({ label, selected = false, onChange = () => { } }) => {
    return (
      <label>
        <input type='checkbox' checked={selected} onChange={(e) => onChange(e.target.checked, label)} />
        <span>{label}</span>
      </label>
    );
  };

  const RadioButton = ({ label, selected = false, onChange = () => { } }) => {
    return (
      <label>
        <input type='radio' name='sortOption' checked={selected} onChange={() => onChange(label)} />
        <span>{label}</span>
      </label>
    );
  };

  // ✅ Fixed room type spellings
  const roomTypes = [
    'Single Bed',
    'Double Bed',
    'Luxury Room',
    'Family Suites',
  ];

  const priceRange = [
    '0 to 500',
    '500 to 1000',
    '1000 to 2000',
    '2000 to 3000',
  ];

  const sortOptions = [
    'Price Low to High',
    'Price High to Low',
    'Newest First'
  ];

  return (
    <div className="all-rooms-container">
      <div className="rooms-layout">

        {/* Filters Section */}
        <div className="filters-box">
          <div className="filters-header">
            <h2>Filters</h2>
            <span className="clear-filter" onClick={clearFilters}>Clear</span> {/* Fixed clear */}
          </div>

          <div className="filters-content">
            <p className="filter-title">Popular Filters</p>
            <p className="filter-title">Room Type</p>
            {roomTypes.map((room, index) => (
              <CheckBox
                key={index}
                label={room}
                selected={selectedFilters.roomType.includes(room)}
                onChange={(checked) => handleFilterChange(checked, room, 'roomType')}
              />
            ))}

            <p className="filter-title">Price Range</p>
            {priceRange.map((range, index) => (
              <CheckBox
                key={index}
                label={`$${range}`}
                selected={selectedFilters.priceRange.includes(range)}
                onChange={(checked) => handleFilterChange(checked, range, 'priceRange')}
              />
            ))}

            <p className="filter-title">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={selectedsort === option}
                onChange={handelSortChange} // fixed prop
              />
            ))}
          </div>
        </div>

        {/* Rooms Section */}
        <div className="rooms-list">
          {filteredRooms.map((room) => (
            <div className="room-card" key={room._id}>
              <div className="room-image-wrapper">
                <img
                  src={room.images[0]}
                  alt="hotel-img"
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    scrollTo(0, 0);
                  }}
                />
              </div>
              <div className="room-info">
                <p className="room-city">{room.hotel.city}</p>
                <p className="room-name">{room.hotel.name}</p>

                <div className="room-reviews">
                  <StarRating />
                  <p>200+ reviews</p>
                </div>

                <div className="room-address">
                  <img src={assets.locationIcon} alt="location-icon" />
                  <span>{room.hotel.address}</span>
                </div>

                <div className="amenities">
                  {room.amenities?.map((item, index) => (
                    <div className="amenity" key={index}>
                      <img src={facilityIcons[item]} alt={item} />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>

                <p className="aminities-p">${room.pricePerNight}</p>
                <p>/Day</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AllRooms;
