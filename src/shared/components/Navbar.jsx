import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShieldCheck } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "./SocialIcons";

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

                <button 
                    className="menu-btn" 
                    onClick={toggleMenu} 
                    aria-label="Toggle Navigation"
                >
                    {menuActive ? <X size={24} /> : <Menu size={24} />}
                </button>

                <nav id="mainNav" className={menuActive ? "active" : ""}>
                    <a
                        href="https://www.instagram.com/_krishna_jewellers_rath/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <InstagramIcon size={18} />
                    </a>

                    <a
                        href="https://www.facebook.com/share/18rPmNgVsh/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                    >
                        <FacebookIcon size={18} />
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

                    <Link 
                        to="/admin" 
                        onClick={handleNavClick} 
                        style={{ 
                            color: "var(--gold)", 
                            fontSize: "12px", 
                            border: "1px solid rgba(212,175,55,0.4)", 
                            padding: "5px 10px", 
                            borderRadius: "6px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px"
                        }}
                    >
                        <ShieldCheck size={14} />
                        Admin
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
