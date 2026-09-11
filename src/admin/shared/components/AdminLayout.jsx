import React, { useState } from "react";
import { LayoutDashboard, Layers, Gem, LogOut, ExternalLink, Menu, X } from "lucide-react";
import { useAuth } from "../../features/auth/AuthContext";

export function AdminLayout({ activeTab, setActiveTab, children }) {
    const { logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { id: "categories", label: "Categories", icon: <Layers size={18} /> },
        { id: "jewellery", label: "Jewellery Catalog", icon: <Gem size={18} /> }
    ];

    const handleNavClick = (id) => {
        setActiveTab(id);
        setSidebarOpen(false);
    };

    return (
        <div className="admin-wrapper">
            {/* Mobile Backdrop */}
            {sidebarOpen && (
                <div 
                    className="admin-sidebar-backdrop"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="admin-sidebar-header">
                    <div className="sidebar-logo-emblem">KJ</div>
                    <div className="sidebar-brand-text">
                        <span className="sidebar-brand-name">Krishna Jewellers</span>
                        <span className="sidebar-brand-sub">Admin Console</span>
                    </div>
                    <button 
                        className="sidebar-close-btn"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close Sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            className={`sidebar-nav-item ${activeTab === item.id ? "active" : ""}`}
                            onClick={() => handleNavClick(item.id)}
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
                    <div className="topbar-left">
                        <button 
                            className="admin-mobile-menu-btn"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Open Navigation Menu"
                        >
                            <Menu size={22} />
                        </button>
                        <h2 className="topbar-title">
                            {navItems.find(i => i.id === activeTab)?.label || "Admin Console"}
                        </h2>
                    </div>
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
