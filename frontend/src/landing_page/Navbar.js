import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // If the token cookie exists on the client, assume authenticated until user logs out.
    const hasToken = document.cookie && document.cookie.indexOf("token=") !== -1;
    if (hasToken) setIsAuthenticated(true);

    const verify = async () => {
      try {
        const { data } = await axios.post(
          "https://profitwave-y5s3.onrender.com",
          {},
          { withCredentials: true }
        );
        // If server confirms, ensure state is true. If server does NOT confirm, do not
        // automatically remove the Logout button here so the UI remains stable for the user
        // until they explicitly click Logout. (We still keep this call to validate session.)
        if (data && data.status) setIsAuthenticated(true);
      } catch (err) {
        // Keep isAuthenticated as-is (do not set false) to avoid transient UI flicker.
        console.warn("Auth verify failed (ignored for UI stability):", err?.message || err);
      }
    };
    verify();
  }, [cookies.token]);

  const handleLogout = () => {
    removeCookie("token");
    setIsAuthenticated(false);
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
                <button onClick={handleLogout} className="nav-link btn btn-link" style={{ cursor: "pointer" }}>
                  Logout
                </button>
              ) : (
                <Link className="nav-link active" aria-current="page" to="/signup">
                  Signup
                </Link>
              )}
            </li>
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
