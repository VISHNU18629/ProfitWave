import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem("isAuthenticated") === "true";
  });

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.post(
          "https://profitwave-y5s3.onrender.com/",
          {},
          { withCredentials: true }
        );
        console.log("Navbar: Auth check:", data);
        if (data && data.status) {
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
        } else {
          setIsAuthenticated(false);
          localStorage.setItem("isAuthenticated", "false");
        }
      } catch (err) {
        console.warn("Navbar: Auth check failed:", err?.message);
        setIsAuthenticated(false);
        localStorage.setItem("isAuthenticated", "false");
      }
    };
    checkAuth();
  }, []);

  // Listen for localStorage changes from other tabs/windows or signup/login
  useEffect(() => {
    const handleStorageChange = (e) => {
      console.log("Navbar: Storage changed:", e);
      if (e.key === "isAuthenticated") {
        setIsAuthenticated(e.newValue === "true");
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    // Also check localStorage periodically in case changes happen in same tab
    const checkInterval = setInterval(() => {
      const authValue = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(authValue);
    }, 500);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(checkInterval);
    };
  }, []);

  const handleLogout = () => {
    removeCookie("token");
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
    navigate("/signup");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light border-bottom" style={{ backgroundColor: "#FFF" }}>
      <div className="container-fluid">
        <Link
          className="navbar-brand ps-3"
          to="/"
          style={{ height: "100%", display: "flex", alignItems: "center" }}
        >
          {/* Logo remains large, but navbar height is fixed. Logo can overflow for visual effect. */}
          <img
            src="media/logo.png"
            style={{ width: "170px", height: "80px", background: "transparent", marginTop: "-12px", marginBottom: "-12px" }}
            alt="logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Move nav links to right using ms-auto, and keep search form separate */}
          <ul className="navbar-nav ms-auto mb-lg-0">
            <li className="nav-item">
              {isAuthenticated ? (
                <button 
                  onClick={handleLogout} 
                  className="nav-link active" 
                  style={{ cursor: "pointer", border: "none", background: "none", padding: "0.5rem 1rem" }}
                >
                  Logout
                </button>
              ) : (
                <Link className="nav-link active" aria-current="page" to="/signup">
                  Signup
                </Link>
              )}
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <a 
                  className="nav-link active" 
                  href="https://profitwavdashboard.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ cursor: "pointer" }}
                >
                  Dashboard
                </a>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/product">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/support">
                Support
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            {/* If you want the search box on the right, keep it here. */}
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
