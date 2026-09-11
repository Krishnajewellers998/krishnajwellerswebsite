import React, { useState, useEffect } from "react";
import { Layers, Gem, TrendingUp, Sparkles } from "lucide-react";
import { fetchCategories } from "../../categories/services/categoriesAdminService";
import { fetchJewellery } from "../../jewellery/services/jewelleryAdminService";
import { fetchGoldRates } from "../../gold-rates/services/goldRatesAdminService";

export function DashboardStats({ onNavigate }) {
    const [stats, setStats] = useState({
        categoriesCount: 0,
        jewelleryCount: 0,
        rate22K: 0
    });

    useEffect(() => {
        async function load() {
            try {
                const [c, j, g] = await Promise.all([
                    fetchCategories(),
                    fetchJewellery({ limit: 1 }),
                    fetchGoldRates()
                ]);
                setStats({
                    categoriesCount: c.categories?.length || 0,
                    jewelleryCount: j.total || 0,
                    rate22K: g.goldRates?.["22K"] || 0
                });
            } catch (_) {}
        }
        load();
    }, []);

    const formatRate = (val) => {
        if (!val) return "—";
        return Number(val).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        });
    };

    return (
        <div className="dashboard-stats-grid">
            <div className="stat-card" onClick={() => onNavigate("gold-rates")}>
                <div className="stat-icon-box gold">
                    <TrendingUp size={24} />
                </div>
                <div className="stat-details">
                    <span className="stat-label">22K Gold Rate (Live)</span>
                    <span className="stat-value">{formatRate(stats.rate22K)}</span>
                    <span className="stat-hint">Click to edit live rates →</span>
                </div>
            </div>

            <div className="stat-card" onClick={() => onNavigate("categories")}>
                <div className="stat-icon-box blue">
                    <Layers size={24} />
                </div>
                <div className="stat-details">
                    <span className="stat-label">Active Categories</span>
                    <span className="stat-value">{stats.categoriesCount}</span>
                    <span className="stat-hint">Manage collections →</span>
                </div>
            </div>

            <div className="stat-card" onClick={() => onNavigate("jewellery")}>
                <div className="stat-icon-box amber">
                    <Gem size={24} />
                </div>
                <div className="stat-details">
                    <span className="stat-label">Jewellery Designs</span>
                    <span className="stat-value">{stats.jewelleryCount}</span>
                    <span className="stat-hint">View product catalog →</span>
                </div>
            </div>
        </div>
    );
}
