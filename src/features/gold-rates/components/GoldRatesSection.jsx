import React from "react";
import { useGoldRates } from "../hooks/useGoldRates";
import { API_BASE_URL } from "../../../shared/services/apiClient";

export function GoldRatesSection() {
    const { rates, loading } = useGoldRates();

    const formatPrice = (val) => {
        if (!val) return "Loading...";
        return `₹${Number(val).toLocaleString("en-IN")}`;
    };

    return (
        <section className="gold-rate" id="gold-rate">
            <div className="gold-rate-title">
                LIVE GOLD RATES <span>(Per 10 Gram)</span>
            </div>

            <div className="gold-rates">
                <div className="rate-card">
                    <h3>24K GOLD</h3>
                    <div className="rate-price" id="rate24Display">
                        {rates && rates["24K"] ? formatPrice(rates["24K"]) : "Loading..."}
                    </div>
                </div>

                <div className="rate-card">
                    <h3>22K GOLD</h3>
                    <div className="rate-price" id="rate22Display">
                        {rates && rates["22K"] ? formatPrice(rates["22K"]) : "Loading..."}
                    </div>
                </div>

                <div className="rate-card">
                    <h3>18K GOLD</h3>
                    <div className="rate-price" id="rate18Display">
                        {rates && rates["18K"] ? formatPrice(rates["18K"]) : "Loading..."}
                    </div>
                </div>
            </div>

            <div className="updated">
                ● {rates ? "Live Stream Updated" : "Connecting to Live Feed..."}
            </div>

            <div className="gold-banner">
                <img 
                    src="/images/banner.jpg" 
                    alt="Krishna Jewellers Offer" 
                    onError={(e) => { e.target.src = `${API_BASE_URL}/images/banner.jpg`; }}
                />
            </div>
        </section>
    );
}

export default GoldRatesSection;
