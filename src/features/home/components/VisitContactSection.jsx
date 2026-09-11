import React from "react";
import { MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "../../../shared/components/SocialIcons";

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
                            <MapPin size={26} color="var(--gold)" />
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
                            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                        >
                            <MapPin size={16} /> Open Google Maps
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
                        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                    >
                        <WhatsAppIcon size={18} /> Contact on WhatsApp
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
                                <InstagramIcon size={20} />
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
                                <FacebookIcon size={20} />
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
