import React from "react";
import { LayoutDashboard, TrendingUp, Layers, Gem, LogOut, ExternalLink } from "lucide-react";
import { useAuth } from "../../features/auth/AuthContext";

export function AdminLayout({ activeTab, setActiveTab, children }) {
    const { logout } = useAuth();

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { id: "gold-rates", label: "Gold Rates", icon: <TrendingUp size={18} /> },
        { id: "categories", label: "Categories", icon: <Layers size={18} /> },
        { id: "jewellery", label: "Jewellery Catalog", icon: <Gem size={18} /> }
    ];

    return (
        <div className="admin-wrapper">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <div className="sidebar-logo-emblem">KJ</div>
                    <div className="sidebar-brand-text">
                        <span className="sidebar-brand-name">Krishna Jewellers</span>
                        <span className="sidebar-brand-sub">Admin Console</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            className={`sidebar-nav-item ${activeTab === item.id ? "active" : ""}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <a 
                        href="/" 
                        className="open-website-btn"
                    >
                        <ExternalLink size={16} /> View Storefront
                    </a>

                    <button className="sidebar-logout-btn" onClick={logout}>
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Area */}
            <div className="admin-main-area">
                <header className="admin-topbar">
                    <h2 className="topbar-title">
                        {navItems.find(i => i.id === activeTab)?.label || "Admin Console"}
                    </h2>
                    <div className="topbar-user">
                        <span className="user-badge">Admin: <strong>krishnaadmin</strong></span>
                    </div>
                </header>

                <main className="admin-content-view">
                    {children}
                </main>
            </div>
        </div>
    );
}
