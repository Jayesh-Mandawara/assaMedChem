import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    try {
        const { user } = useAuth();
        if (!user) {
            return <Navigate to="/login" />;
        }
        return children;
    } catch (error) {
        console.error("Protected component error:", error);
        return <Navigate to="/login" />;
    }
};

export default Protected;
