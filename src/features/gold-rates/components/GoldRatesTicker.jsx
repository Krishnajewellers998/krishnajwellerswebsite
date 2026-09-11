import React from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import { useGoldRates } from "../hooks/useGoldRates";

export function GoldRatesTicker() {
    const { rates, loading } = useGoldRates();

    const formatRate = (val) => {
        if (!val) return "—";
        return Number(val).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        });
    };

    return (
        <div className="gold-ticker-container">
            <div className="gold-ticker-inner">
                <div className="gold-live-badge">
                    <span className="pulse-dot"></span>
                    <span>TODAY'S GOLD RATE (per 10g)</span>
                </div>
                <div className="gold-rates-list">
                    <div className="rate-item">
                        <span className="purity">24K (999)</span>
                        <span className="price">{loading ? "..." : formatRate(rates["24K"])}</span>
                    </div>
                    <div className="rate-divider">|</div>
                    <div className="rate-item highlight">
                        <span className="purity">22K (916 Hallmarked)</span>
                        <span className="price">{loading ? "..." : formatRate(rates["22K"])}</span>
                    </div>
                    <div className="rate-divider">|</div>
                    <div className="rate-item">
                        <span className="purity">18K (750)</span>
                        <span className="price">{loading ? "..." : formatRate(rates["18K"])}</span>
                    </div>
                </div>
                <div className="gold-disclaimer">
                    <Sparkles size={14} className="gold-icon" />
                    <span>100% BIS Hallmarked Jewellery</span>
                </div>
            </div>
        </div>
    );
}
