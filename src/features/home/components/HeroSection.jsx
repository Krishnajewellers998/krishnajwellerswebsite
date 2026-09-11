import React from "react";
import { Sparkles, ArrowDown } from "lucide-react";

export function HeroSection({ onExploreClick }) {
    return (
        <section className="hero-section">
            <div className="hero-background-overlay" />
            <div className="hero-content">
                <div className="hero-badge">
                    <Sparkles size={16} className="hero-sparkle" />
                    <span>ESTABLISHED 1991 • RATH, UTTAR PRADESH</span>
                </div>
                <h1 className="hero-title">
                    Timeless Elegance, <br />
                    <span className="gold-gradient-text">Pure BIS Hallmarked Gold</span>
                </h1>
                <p className="hero-subtitle">
                    Discover handcrafted bridal sets, necklaces, bangles, and everyday luxury crafted with over 3 decades of trust and artistic brilliance.
                </p>
                <div className="hero-cta-group">
                    <button className="primary-gold-btn" onClick={onExploreClick}>
                        Explore Collection <ArrowDown size={16} />
                    </button>
                    <a 
                        href="https://wa.me/919984123388?text=Hello%20Krishna%20Jewellers!%20I%20would%20like%20to%20inquire%20about%20your%20jewellery%20collection." 
                        target="_blank" 
                        rel="noreferrer"
                        className="secondary-outline-btn"
                    >
                        Inquire on WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
}
