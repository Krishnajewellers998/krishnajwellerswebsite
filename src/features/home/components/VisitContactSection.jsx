import React from "react";

export function VisitContactSection() {
    return (
        <section className="visit-contact" id="location">
            <div className="visit-contact-inner">
                {/* LOCATION */}
                <div className="location-side">
                    <div className="section-label">
                        Visit Us
                    </div>
                    <h2>
                        Find Krishna Jewellers
                    </h2>
                    <p>
                        We would be happy to welcome you at our showroom.
                    </p>

                    <div className="location-box">
                        <div className="location-icon">
                            📍
                        </div>
                        <h2>
                            Krishna Jewellers
                        </h2>
                        <p>
                            Khushipura, Rath,<br />
                            Uttar Pradesh 210431
                        </p>

                        <a
                            href="https://www.google.com/maps/place/krishna+jewellers,+Khushipura,+Rath,+Uttar+Pradesh+210431/@25.5926833,79.5662587,16z/data=!4m6!3m5!1s0x399d434a0774dc51:0x76e7534921a91ce!8m2!3d25.5926833!4d79.5662587!16s%2Fg%2F11l6tmshdf"
                            target="_blank"
                            rel="noreferrer"
                            className="map-btn"
                        >
                            📍 Open Google Maps
                        </a>
                    </div>
                </div>

                {/* CONTACT */}
                <div className="contact-side" id="contact">
                    <div className="section-label">
                        Get In Touch
                    </div>
                    <h2>
                        Contact Krishna Jewellers
                    </h2>
                    <p>
                        Like a jewellery design? Contact us directly on WhatsApp for enquiries and details.
                    </p>

                    <a
                        href="https://wa.me/919984123388"
                        target="_blank"
                        rel="noreferrer"
                        className="contact-btn"
                    >
                        🟢 Contact on WhatsApp
                    </a>

                    <div className="social-links">
                        {/* INSTAGRAM */}
                        <div className="social-item">
                            <a
                                href="https://www.instagram.com/_krishna_jewellers_rath/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-btn"
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
                            <span className="social-name">
                                Instagram
                            </span>
                        </div>

                        {/* FACEBOOK */}
                        <div className="social-item">
                            <a
                                href="https://www.facebook.com/share/18rPmNgVsh/?mibextid=wwXIfr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-btn"
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
                            <span className="social-name">
                                Facebook
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default VisitContactSection;
