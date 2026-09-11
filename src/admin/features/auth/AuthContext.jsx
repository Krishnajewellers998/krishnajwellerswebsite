import React, { createContext, useContext, useState, useEffect } from "react";
import { loginAdmin, logoutAdmin, checkAdminAuth } from "./services/authService";
import { getAdminToken } from "../../shared/services/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!getAdminToken());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function verify() {
            const valid = await checkAdminAuth();
            setIsAuthenticated(valid);
            setLoading(false);
        }
        verify();
    }, []);

    const login = async (username, password) => {
        const res = await loginAdmin(username, password);
        if (res.success) {
            setIsAuthenticated(true);
        }
        return res;
    };

    const logout = async () => {
        await logoutAdmin();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
