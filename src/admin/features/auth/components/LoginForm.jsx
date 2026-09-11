import React, { useState } from "react";
import { Lock, User, AlertCircle, Sparkles } from "lucide-react";
import { useAuth } from "../AuthContext";

export function LoginForm() {
    const { login } = useAuth();
    const [username, setUsername] = useState("krishnaadmin");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(username, password);
        } catch (err) {
            setError(err.message || "Invalid Admin credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="admin-logo">KJ</div>
                    <h2>Krishna Jewellers</h2>
                    <p>Admin Management Panel</p>
                </div>

                {error && (
                    <div className="login-error-alert">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Admin ID</label>
                        <div className="input-with-icon">
                            <User size={18} className="input-icon" />
                            <input 
                                id="username"
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-with-icon">
                            <Lock size={18} className="input-icon" />
                            <input 
                                id="password"
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter secure password"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="admin-primary-btn login-btn"
                        disabled={loading}
                    >
                        {loading ? "Authenticating..." : "Sign In to Admin Panel"}
                    </button>
                </form>

                <div className="login-footer">
                    <Sparkles size={14} /> Authorized Personnel Only
                </div>
            </div>
        </div>
    );
}
