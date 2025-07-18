import Navbar from "./Navbar.jsx";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>
        <Navbar />
        {children || <Outlet />}
    </>
};

export default ProtectedRoute;