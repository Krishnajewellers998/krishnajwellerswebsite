import React, { useState, useEffect } from "react";
import { TrendingUp, CheckCircle, AlertCircle } from "lucide-react";
import { fetchGoldRates, updateGoldRates } from "../services/goldRatesAdminService";

export function GoldRatesEditor() {
    const [rate24, setRate24] = useState("");
    const [rate22, setRate22] = useState("");
    const [rate18, setRate18] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }

    useEffect(() => {
        async function load() {
            try {
                const res = await fetchGoldRates();
                if (res?.goldRates) {
                    setRate24(res.goldRates["24K"] || "");
                    setRate22(res.goldRates["22K"] || "");
                    setRate18(res.goldRates["18K"] || "");
                }
            } catch (_) {}
        }
        load();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await updateGoldRates({
                rate24: Number(rate24),
                rate22: Number(rate22),
                rate18: Number(rate18)
            });
            setStatus({ type: "success", message: res.message || "Gold rates updated successfully!" });
        } catch (err) {
            setStatus({ type: "error", message: err.message || "Failed to update gold rates." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-card">
            <div className="card-header">
                <div>
                    <h3 className="card-title">Live Gold Rate Management</h3>
                    <p className="card-subtitle">Rates are per 10 grams in INR. Updates reflect live on Website & Mobile App immediately.</p>
                </div>
            </div>

            {status && (
                <div className={`admin-alert ${status.type}`}>
                    {status.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    <span>{status.message}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="gold-editor-form">
                <div className="gold-inputs-grid">
                    <div className="gold-field-box">
                        <label>24K Gold Rate (₹ / 10g)</label>
                        <input 
                            type="number"
                            value={rate24}
                            onChange={(e) => setRate24(e.target.value)}
                            required
                            min="1000"
                        />
                    </div>

                    <div className="gold-field-box highlight">
                        <label>22K Gold Rate (916 BIS)</label>
                        <input 
                            type="number"
                            value={rate22}
                            onChange={(e) => setRate22(e.target.value)}
                            required
                            min="1000"
                        />
                    </div>

                    <div className="gold-field-box">
                        <label>18K Gold Rate (₹ / 10g)</label>
                        <input 
                            type="number"
                            value={rate18}
                            onChange={(e) => setRate18(e.target.value)}
                            required
                            min="1000"
                        />
                    </div>
                </div>

                <div className="form-actions-row">
                    <button type="submit" className="admin-primary-btn" disabled={loading}>
                        {loading ? "Saving Rates..." : "Save & Broadcast Gold Rates"}
                    </button>
                </div>
            </form>
        </div>
    );
}
