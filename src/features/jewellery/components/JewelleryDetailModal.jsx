import React, { useState } from "react";
import { X, CheckCircle2, MessageSquare, PhoneCall, ShieldCheck } from "lucide-react";
import { getImageUrl } from "../../../shared/services/apiClient";

export function JewelleryDetailModal({ item, onClose }) {
    if (!item) return null;

    const photos = Array.isArray(item.photos) && item.photos.length > 0 
        ? item.photos 
        : [item.image || ""];

    const [selectedPhoto, setSelectedPhoto] = useState(photos[0]);

    const handleWhatsApp = () => {
        const text = encodeURIComponent(
            `Hello Krishna Jewellers! I am interested in "${item.name}" (${item.category || "Jewellery"}). Please share more details and current pricing.`
        );
        window.open(`https://wa.me/919984123388?text=${text}`, "_blank");
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
                    <X size={20} />
                </button>

                <div className="modal-grid">
                    {/* Left: Gallery */}
                    <div className="modal-gallery">
                        <div className="modal-main-image-wrap">
                            <img 
                                src={getImageUrl(selectedPhoto)} 
                                alt={item.name} 
                                className="modal-main-image"
                            />
                        </div>
                        {photos.length > 1 && (
                            <div className="modal-thumbnails">
                                {photos.map((photo, i) => (
                                    <div 
                                        key={i} 
                                        className={`thumb-wrap ${selectedPhoto === photo ? "active" : ""}`}
                                        onClick={() => setSelectedPhoto(photo)}
                                    >
                                        <img src={getImageUrl(photo)} alt={`${item.name} thumb ${i + 1}`} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Info */}
                    <div className="modal-info">
                        <span className="modal-category-tag">{item.category || "Fine Jewellery"}</span>
                        <h2 className="modal-title">{item.name}</h2>

                        <div className="modal-badges">
                            <div className="badge-item">
                                <ShieldCheck size={16} className="badge-icon" />
                                <span>{item.purity || "22K (916) BIS Hallmarked"}</span>
                            </div>
                            {item.weight && (
                                <div className="badge-item">
                                    <span>Weight: <strong>{item.weight}</strong></span>
                                </div>
                            )}
                        </div>

                        {item.description && (
                            <div className="modal-description">
                                <h4>Description & Craftsmanship</h4>
                                <p>{item.description}</p>
                            </div>
                        )}

                        <div className="hallmark-box">
                            <CheckCircle2 size={18} className="hallmark-icon" />
                            <div>
                                <strong>100% Certified Purity</strong>
                                <p>Every ornament is stamped with official BIS Hallmark certification.</p>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button className="cta-btn whatsapp-btn" onClick={handleWhatsApp}>
                                <MessageSquare size={18} /> Inquire via WhatsApp
                            </button>
                            <a href="tel:+919984123388" className="cta-btn call-btn">
                                <PhoneCall size={18} /> Call Showroom
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
