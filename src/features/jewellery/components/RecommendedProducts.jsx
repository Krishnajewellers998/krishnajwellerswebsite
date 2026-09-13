import React, { useState } from "react";
import { Sparkles, ArrowRight, Scale, X } from "lucide-react";
import { useJewellery } from "../hooks/useJewellery";
import { ImageWithFallback } from "../../../shared/components/ImageWithFallback";
import { getImageUrl } from "../../../shared/services/apiClient";

export function RecommendedProducts() {
    const { items, loading } = useJewellery({ limit: 4 });
    const [modalItem, setModalItem] = useState(null);

    if (loading) {
        return (
            <div className="recommended-section" style={{ marginTop: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}>
                    <Sparkles size={20} color="var(--gold-dark)" />
                    <h3 style={{ fontSize: '18px', color: 'var(--text-main)', margin: 0 }}>Recommended for You</h3>
                </div>
                <div className="products-grid">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="product-skeleton" />
                    ))}
                </div>
            </div>
        );
    }

    if (!items || items.length === 0) return null;

    const getProductImage = (item) => {
        let img = "";
        if (Array.isArray(item.photos) && item.photos.length > 0) {
            img = item.photos[0];
        } else if (item.image) {
            img = item.image;
        }
        return getImageUrl(img);
    };

    const getItemImages = (item) => {
        let imgs = [];
        if (Array.isArray(item.photos) && item.photos.length > 0) {
            imgs = item.photos;
        } else if (item.image) {
            imgs = [item.image];
        }
        return imgs.map(img => getImageUrl(img));
    };

    return (
        <div className="recommended-section" style={{ marginTop: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}>
                <Sparkles size={20} color="var(--gold-dark)" />
                <h3 style={{ fontSize: '20px', color: 'var(--text-main)', margin: 0, fontFamily: 'serif' }}>Recommended for You</h3>
            </div>
            
            <div className="products-grid">
                {items.slice(0, 4).map((item, idx) => {
                    const firstImg = getProductImage(item);
                    return (
                        <div
                            key={item.id || idx}
                            className="product-card"
                            onClick={() => {
                                setModalItem(item);
                                document.body.style.overflow = "hidden";
                            }}
                        >
                            <div className="product-card-image-wrap">
                                <ImageWithFallback
                                    src={firstImg}
                                    alt={item.name || "Jewellery"}
                                    className="product-card-image"
                                />
                                <div className="product-card-overlay">
                                    <span>View Details</span>
                                </div>
                            </div>
                            <div className="product-card-info">
                                <h3 className="product-card-name">{item.name || "Jewellery"}</h3>
                                {item.weight && (
                                    <span className="product-card-weight" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                        <Scale size={13} /> {item.weight}g
                                    </span>
                                )}
                                {item.purity && (
                                    <span className="product-card-purity">{item.purity}</span>
                                )}
                                <button className="product-card-enquire" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                                    Enquire Now <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal for Recommended Item */}
            {modalItem && (
                <div className="product-modal" onClick={() => { setModalItem(null); document.body.style.overflow = ""; }}>
                    <div className="product-modal-content" onClick={e => e.stopPropagation()}>
                        <button 
                            className="modal-close-btn" 
                            onClick={() => { setModalItem(null); document.body.style.overflow = ""; }}
                            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                        >
                            <X size={20} />
                        </button>
                        
                        <div className="product-modal-grid">
                            <div className="product-modal-image-col">
                                <ImageWithFallback
                                    src={getItemImages(modalItem)[0] || ""}
                                    alt={modalItem.name}
                                    className="modal-main-image"
                                />
                            </div>
                            <div className="product-modal-details">
                                <span className="modal-category">{modalItem.category}</span>
                                <h2>{modalItem.name}</h2>
                                <div className="modal-specs">
                                    {modalItem.weight && (
                                        <div className="spec-item">
                                            <span className="spec-label">Weight</span>
                                            <span className="spec-value">{modalItem.weight}g</span>
                                        </div>
                                    )}
                                    {modalItem.purity && (
                                        <div className="spec-item">
                                            <span className="spec-label">Purity</span>
                                            <span className="spec-value">{modalItem.purity}</span>
                                        </div>
                                    )}
                                </div>
                                {modalItem.description && (
                                    <div className="modal-description">
                                        <p>{modalItem.description}</p>
                                    </div>
                                )}
                                <a 
                                    href={`https://wa.me/1234567890?text=I'm interested in ${modalItem.name}`}
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="whatsapp-btn"
                                >
                                    Enquire on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
