import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import HomePage from "./HomePage";  // Import your existing HomePage component
import "./styles.css";
const ProtectedHome = () => {
  const navigate = useNavigate();
  // useCookies returns [cookies, setCookie, removeCookie]
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }
      try {
        // Backend runs on PORT defined in backend/index.js (default 3002)
        const { data } = await axios.post(
          "https://profitwave-y5s3.onrender.com",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        if (status) {
          setUsername(user);
          setIsAuthenticated(true);
          toast(`Hello ${user}`, {
            position: "top-right",
          });
          setLoading(false);
        } else {
          removeCookie("token");
          navigate("/login");
          setLoading(false);
        }
      } catch (error) {
        removeCookie("token");
        navigate("/login");
        setLoading(false);
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  if (loading) {
    return (
      <div className="protected-loading" style={{ padding: 40, textAlign: "center" }}>
        <p>Verifying authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // not authenticated (navigation already triggered)
  }

  return (
    <>
      <div className="auth-header">
        <span>Welcome {username}</span>
        <button onClick={handleLogout} className="logout-btn">LOGOUT</button>
      </div>
      <HomePage /> {/* Your existing home page content */}
      <ToastContainer />
    </>
  );
};

export default ProtectedHome;
