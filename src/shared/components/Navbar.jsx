import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar({ onResetHome }) {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(prev => !prev);
    };

    const handleNavClick = () => {
        setMenuActive(false);
    };

    return (
        <header>
            <div className="navbar">
                <a 
                    href="#top" 
                    className="logo" 
                    onClick={(e) => {
                        e.preventDefault();
                        if (onResetHome) onResetHome();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                >
                    <img 
                        src="/images/logo.png" 
                        alt="Krishna Jewellers Logo" 
                        onError={(e) => { e.target.src = "http://localhost:3000/images/logo.png"; }} 
                    />
                    <div className="logo-text">
                        <span>Krishna Jewellers</span>
                        <small>Fine Jewellery</small>
                    </div>
                </a>

                <button className="menu-btn" onClick={toggleMenu} aria-label="Toggle Navigation">
                    ☰
                </button>

                <nav id="mainNav" className={menuActive ? "active" : ""}>
                    <a
                        href="https://www.instagram.com/_krishna_jewellers_rath/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                            <circle cx="12" cy="12" r="4"></circle>
                            <circle cx="17.5" cy="6.5" r="1"></circle>
                        </svg>
                    </a>

                    <a
                        href="https://www.facebook.com/share/18rPmNgVsh/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="currentColor"
                        >
                            <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1z"></path>
                        </svg>
                    </a>

                    <a href="#collection" onClick={handleNavClick}>
                        Collection
                    </a>

                    <a href="#family" onClick={handleNavClick}>
                        Our Family
                    </a>

                    <a href="#location" onClick={handleNavClick}>
                        Location
                    </a>

                    <a href="#contact" onClick={handleNavClick}>
                        Contact
                    </a>

                    <Link to="/admin" onClick={handleNavClick} style={{ color: "var(--gold)", fontSize: "12px", border: "1px solid rgba(212,175,55,0.4)", padding: "4px 8px", borderRadius: "4px" }}>
                        Admin
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
