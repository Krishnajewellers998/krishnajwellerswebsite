import React, { useState, useMemo } from "react";
import { ArrowLeft, Scale, Sparkles, MessageCircle, ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";
import { useJewellery } from "../hooks/useJewellery";
import { API_BASE_URL, getImageUrl } from "../../../shared/services/apiClient";
import { ImageWithFallback } from "../../../shared/components/ImageWithFallback";

export function CategoryProductsView({ category, searchQuery, onBack, onSearch }) {
    const { items: jewellery, loading, loadingMore, hasMore, loadMore } = useJewellery({
        category,
        search: searchQuery
    });
    const [modalItem, setModalItem] = useState(null);
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);

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

    const openModal = (item) => {
        setModalItem(item);
        setActivePhotoIndex(0);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setModalItem(null);
        document.body.style.overflow = "";
    };

    const modalImages = modalItem ? getItemImages(modalItem) : [];

    const pageTitle = searchQuery
        ? `Results for "${searchQuery}"`
        : `${category} Collection`;

    const visibleProducts = filteredProducts.slice(0, visibleCount);

    return (
        <div className="products-view-root">
            {/* ── Page Header ── */}
            <section className="products-page-header">
                <button 
                    className="products-back-btn" 
                    onClick={onBack}
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                    <ArrowLeft size={16} /> Back to Collections
                </button>
                <div className="products-header-text">
                    <span className="products-page-label">Our Collection</span>
                    <h1 id="categoryTitle" className="products-page-title">{pageTitle}</h1>
                    <p className="products-page-count">
                        {loading
                            ? "Loading designs..."
                            : `${jewellery.length} design${jewellery.length !== 1 ? "s" : ""} available`}
                    </p>
                </div>
            </section>

            {/* ── Product Grid ── */}
            <section className="products-grid-section">
                {loading && jewellery.length === 0 ? (
                    <div className="products-loading-state">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="product-skeleton" />
                        ))}
                    </div>
                ) : jewellery.length === 0 ? (
                    <div className="products-empty-state">
                        <div className="empty-icon">
                            <Sparkles size={40} color="var(--gold)" />
                        </div>
                        <h3>No designs found</h3>
                        <p>No jewellery matching your criteria. Try a different category.</p>
                        <button 
                            className="products-back-btn" 
                            onClick={onBack}
                            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                        >
                            <ArrowLeft size={16} /> View All Categories
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="products-grid" id="productsContainer">
                            {jewellery.map((item, idx) => {
                                const firstImg = getProductImage(item);
                                return (
                                    <div
                                        key={item.id || idx}
                                        className="product-card"
                                        onClick={() => openModal(item)}
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
                                            {item.description && (
                                                <p className="product-card-desc">{item.description}</p>
                                            )}
                                            <button className="product-card-enquire" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                                                Enquire Now <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {hasMore && (
                            <div className="load-more-wrap" style={{ textAlign: 'center', marginTop: '40px' }}>
                                <button
                                    id="loadMoreBtn"
                                    className="load-more-btn"
                                    onClick={loadMore}
                                    disabled={loadingMore}
                                    style={{
                                        padding: '12px 32px',
                                        backgroundColor: 'var(--gold-dark)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '30px',
                                        cursor: loadingMore ? 'wait' : 'pointer',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}
                                >
                                    {loadingMore ? "Loading..." : "Load More Designs"}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* ── Detail Modal ── */}
            {modalItem && (
                <div className="product-modal" id="imageModal" onClick={closeModal}>
                    <div className="product-modal-content" onClick={e => e.stopPropagation()}>
                        <button 
                            className="modal-close-btn" 
                            onClick={closeModal}
                            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                            aria-label="Close Modal"
                        >
                            <X size={20} />
                        </button>

                        <div className="modal-layout">
                            {/* Left: Image Gallery */}
                            <div className="modal-gallery-panel">
                                <div className="modal-main-image-wrap">
                                    {modalImages.length > 1 && (
                                        <button
                                            className="modal-nav-btn modal-prev"
                                            onClick={() => setActivePhotoIndex(prev => prev > 0 ? prev - 1 : modalImages.length - 1)}
                                            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                                            aria-label="Previous Photo"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                    )}
                                    <ImageWithFallback
                                        id="modalImage"
                                        className="modal-main-image"
                                        src={modalImages[activePhotoIndex]}
                                        alt={modalItem.name || "Jewellery"}
                                    />
                                    {modalImages.length > 1 && (
                                        <button
                                            className="modal-nav-btn modal-next"
                                            onClick={() => setActivePhotoIndex(prev => prev < modalImages.length - 1 ? prev + 1 : 0)}
                                            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                                            aria-label="Next Photo"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    )}
                                    {modalImages.length > 1 && (
                                        <div className="modal-photo-counter" id="photoCounter">
                                            {activePhotoIndex + 1} / {modalImages.length}
                                        </div>
                                    )}
                                </div>

                                {modalImages.length > 1 && (
                                    <div className="modal-thumbs" id="modalGallery">
                                        {modalImages.map((img, i) => (
                                            <div 
                                                key={i}
                                                className={`modal-thumb-wrap ${i === activePhotoIndex ? "active" : ""}`}
                                                onClick={() => setActivePhotoIndex(i)}
                                                style={{ cursor: 'pointer', width: '60px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: i === activePhotoIndex ? '2px solid var(--gold)' : '1px solid transparent' }}
                                            >
                                                <ImageWithFallback src={img} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right: Info */}
                            <div className="modal-info-panel">
                                <span className="modal-category-tag">{modalItem.category}</span>
                                <h2 id="modalName" className="modal-item-name">{modalItem.name || "Jewellery"}</h2>

                                <div className="modal-specs">
                                    {modalItem.weight && (
                                        <div className="modal-spec">
                                            <span className="spec-label">Weight</span>
                                            <span className="spec-value">{modalItem.weight} Gram</span>
                                        </div>
                                    )}
                                    {modalItem.purity && (
                                        <div className="modal-spec">
                                            <span className="spec-label">Purity</span>
                                            <span className="spec-value">{modalItem.purity}</span>
                                        </div>
                                    )}
                                </div>

                                {modalItem.description && (
                                    <p id="modalDescription" className="modal-item-desc">{modalItem.description}</p>
                                )}

                                <a
                                    id="modalWhatsapp"
                                    href={`https://wa.me/919984123388?text=${encodeURIComponent(`Hello Krishna Jewellers, I am interested in: ${modalItem.name || "Jewellery"} (Weight: ${modalItem.weight || "N/A"}g). Please share price and details.`)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="modal-whatsapp-btn"
                                    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                                >
                                    <MessageCircle size={18} /> Enquire on WhatsApp
                                </a>

                                <p className="modal-note">Price available on request. Contact us for today's rate.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CategoryProductsView;
