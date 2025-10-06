import React from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useLocation } from "react-router";
import { useAppContext } from "../context/AppContext";

const NavBar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/experience" },
    { name: "About", path: "/about" },
  ];

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { openSignIn } = useClerk();

  const location = useLocation();

  const { user, navigate, isOwner, setShowHotelReg } = useAppContext();

  React.useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }
    setIsScrolled((prev) => (location.pathname !== "/" ? true : prev));
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`nav-base ${isScrolled ? "nav-scrolled" : ""}`}>
      {/* Logo */}
      <a className="logo-link" href="/">
        <img
          src="/logo-no-bg.png"
          alt="logo"
          className={`logo ${isScrolled ? "logo-scrolled" : ""}`}
        />
      </a>

      {/* Desktop Nav */}
      <div className="desktop-nav">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className={`nav-link ${isScrolled ? "nav-link-scrolled" : ""}`}
          >
            {link.name}
          </a>
        ))}
        {user && (
          <button
            onClick={() =>
              isOwner ? navigate("/Owner") : setShowHotelReg(true)
            }
            className={`new-launch-button ${
              isScrolled ? "new-launch-scrolled" : ""
            }`}
          >
            {isOwner ? "Dashboard" : "List Your Hotel"}
          </button>
        )}
      </div>

      {/* Desktop Right */}
      <div className="desktop-right">
        <img
          src={assets.searchIcon}
          alt="search"
          className={`search-icon ${isScrolled ? "inverted" : ""}`}
        />
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                // ✅ add the dashboard icon here
                labelIcon={
                  <img
                    src={assets.dashboardIcon}
                    alt="Dashboard"
                    style={{ width: 18, height: 18 }}
                  />
                }
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className={`login-button ${
              isScrolled ? "login-button-scrolled" : ""
            }`}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div
        className="mobile-menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {user && (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                // ✅ add the dashboard icon here
                labelIcon={
                  <img
                    src={assets.dashboardIcon}
                    alt="Dashboard"
                    style={{ width: 18, height: 18 }}
                  />
                }
                onClick={() => navigate("/MyBookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
        <img
          src={isMenuOpen ? assets.closeIcon : assets.menuIcon}
          alt="menu-toggle"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu-container ${
          isMenuOpen ? "mobile-menu-open" : ""
        }`}
      >
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="nav-link nav-link-mobile"
          >
            {link.name}
          </a>
        ))}

        {user && (
          <button
            onClick={() =>
              isOwner ? navigate("/Owner") : setShowHotelReg(true)
            }
            className="new-launch-button new-launch-mobile"
          >
            {isOwner ? "Dashboard" : "List Your Hotel"}
          </button>
        )}

        {!user && (
          <button onClick={openSignIn} className="login-button login-mobile">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
