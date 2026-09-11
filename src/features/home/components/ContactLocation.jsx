import React from "react";
import { MapPin, Phone, MessageSquare, Clock } from "lucide-react";

export function ContactLocation() {
    return (
        <section className="contact-section" id="contact">
            <div className="section-header">
                <span className="section-subtitle">VISIT OUR SHOWROOM</span>
                <h2 className="section-title">Experience In Person</h2>
                <div className="gold-accent-line"></div>
            </div>

            <div className="contact-grid">
                <div className="contact-card">
                    <div className="contact-item">
                        <MapPin className="c-icon" size={24} />
                        <div>
                            <h4>Showroom Location</h4>
                            <p>Khushipura, Rath, Hamirpur District, Uttar Pradesh 210431</p>
                            <a 
                                href="https://www.google.com/maps/place/krishna+jewellers,+Khushipura,+Rath,+Uttar+Pradesh+210431/@25.5926833,79.5662587,16z" 
                                target="_blank" 
                                rel="noreferrer"
                                className="map-link"
                            >
                                Open in Google Maps →
                            </a>
                        </div>
                    </div>

                    <div className="contact-item">
                        <Phone className="c-icon" size={24} />
                        <div>
                            <h4>Call Us</h4>
                            <p><a href="tel:+919984123388">+91 99841 23388</a></p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <MessageSquare className="c-icon" size={24} />
                        <div>
                            <h4>WhatsApp Support</h4>
                            <p><a href="https://wa.me/919984123388" target="_blank" rel="noreferrer">+91 99841 23388</a></p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <Clock className="c-icon" size={24} />
                        <div>
                            <h4>Showroom Timings</h4>
                            <p>Monday - Sunday: 10:00 AM - 8:30 PM</p>
                        </div>
                    </div>

                    <div className="social-links-row">
                        <a href="https://www.instagram.com/_krishna_jewellers_rath/" target="_blank" rel="noreferrer" aria-label="Instagram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                        </a>
                        <a href="https://www.facebook.com/share/18rPmNgVsh/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        </a>
                    </div>
                </div>

                <div className="map-embed-card">
                    <div className="map-placeholder">
                        <MapPin size={48} className="map-center-pin" />
                        <h3>Krishna Jewellers Showroom</h3>
                        <p>Khushipura, Rath, Uttar Pradesh 210431</p>
                        <a 
                            href="https://www.google.com/maps/place/krishna+jewellers,+Khushipura,+Rath,+Uttar+Pradesh+210431/@25.5926833,79.5662587,16z" 
                            target="_blank" 
                            rel="noreferrer"
                            className="primary-gold-btn map-btn"
                        >
                            Get Driving Directions
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
