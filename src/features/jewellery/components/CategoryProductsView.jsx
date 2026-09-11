import React, { useState, useMemo } from "react";
import { useJewellery } from "../hooks/useJewellery";
import { API_BASE_URL } from "../../../shared/services/apiClient";

export function CategoryProductsView({ category, searchQuery, onBack, onSearch }) {
    const { items: jewellery, loading } = useJewellery();
    const [visibleCount, setVisibleCount] = useState(20);
    const [modalItem, setModalItem] = useState(null);
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);

    // Filter products based on category or search
    const filteredProducts = useMemo(() => {
        let list = jewellery || [];

        if (searchQuery) {
            const query = searchQuery.trim().toLowerCase();
            list = list.filter(item => {
                const name = String(item.name || "").toLowerCase();
                const cat = String(item.category || "").toLowerCase();
                const desc = String(item.description || "").toLowerCase();
                const syn = Array.isArray(item.synonyms) ? item.synonyms.join(" ").toLowerCase() : String(item.synonyms || "").toLowerCase();
                return name.includes(query) || cat.includes(query) || desc.includes(query) || syn.includes(query);
            });
        } else if (category && category !== "All") {
            list = list.filter(item => String(item.category || "").toLowerCase() === category.toLowerCase());
        }

        return list;
    }, [jewellery, category, searchQuery]);

    const getProductImage = (item) => {
        let img = "";
        if (Array.isArray(item.images) && item.images.length > 0) {
            img = item.images[0];
        } else if (item.image) {
            img = item.image;
        }
        if (!img) return "";
        if (img.startsWith("http")) return img;
        const clean = img.startsWith("/") ? img.slice(1) : img;
        return `${API_BASE_URL}/${clean}`;
    };

    const getItemImages = (item) => {
        let imgs = [];
        if (Array.isArray(item.images) && item.images.length > 0) {
            imgs = item.images;
        } else if (item.image) {
            imgs = [item.image];
        }
        return imgs.map(img => {
            if (img.startsWith("http")) return img;
            const clean = img.startsWith("/") ? img.slice(1) : img;
            return `${API_BASE_URL}/${clean}`;
        });
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
                <button className="products-back-btn" onClick={onBack}>
                    ← Back to Collections
                </button>
                <div className="products-header-text">
                    <span className="products-page-label">Our Collection</span>
                    <h1 id="categoryTitle" className="products-page-title">{pageTitle}</h1>
                    <p className="products-page-count">
                        {loading
                            ? "Loading designs..."
                            : `${filteredProducts.length} design${filteredProducts.length !== 1 ? "s" : ""} available`}
                    </p>
                </div>
            </section>

            {/* ── Product Grid ── */}
            <section className="products-grid-section">
                {loading ? (
                    <div className="products-loading-state">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="product-skeleton" />
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="products-empty-state">
                        <div className="empty-icon">💍</div>
                        <h3>No designs found</h3>
                        <p>No jewellery matching your criteria. Try a different category.</p>
                        <button className="products-back-btn" onClick={onBack}>View All Categories</button>
                    </div>
                ) : (
                    <>
                        <div className="products-grid" id="productsContainer">
                            {visibleProducts.map((item, idx) => {
                                const firstImg = getProductImage(item);
                                return (
                                    <div
                                        key={item.id || idx}
                                        className="product-card"
                                        onClick={() => openModal(item)}
                                    >
                                        <div className="product-card-image-wrap">
                                            {firstImg ? (
                                                <img
                                                    src={firstImg}
                                                    alt={item.name || "Jewellery"}
                                                    className="product-card-image"
                                                    loading="lazy"
                                                    onError={(e) => { e.target.src = "/images/category-ring.jpg"; }}
                                                />
                                            ) : (
                                                <div className="product-card-no-photo">
                                                    <span>💍</span>
                                                    <p>No Photo</p>
                                                </div>
                                            )}
                                            <div className="product-card-overlay">
                                                <span>View Details</span>
                                            </div>
                                        </div>
                                        <div className="product-card-info">
                                            <h3 className="product-card-name">{item.name || "Jewellery"}</h3>
                                            {item.weight && (
                                                <span className="product-card-weight">⚖ {item.weight}g</span>
                                            )}
                                            {item.purity && (
                                                <span className="product-card-purity">{item.purity}</span>
                                            )}
                                            {item.description && (
                                                <p className="product-card-desc">{item.description}</p>
                                            )}
                                            <button className="product-card-enquire">Enquire Now →</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {filteredProducts.length > visibleCount && (
                            <div className="load-more-wrap">
                                <button
                                    id="loadMoreBtn"
                                    className="load-more-btn"
                                    onClick={() => setVisibleCount(prev => prev + 20)}
                                >
                                    Load More Designs
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
                        <button className="modal-close-btn" onClick={closeModal}>✕</button>

                        <div className="modal-layout">
                            {/* Left: Image Gallery */}
                            <div className="modal-gallery-panel">
                                <div className="modal-main-image-wrap">
                                    {modalImages.length > 1 && (
                                        <button
                                            className="modal-nav-btn modal-prev"
                                            onClick={() => setActivePhotoIndex(prev => prev > 0 ? prev - 1 : modalImages.length - 1)}
                                        >‹</button>
                                    )}
                                    <img
                                        id="modalImage"
                                        className="modal-main-image"
                                        src={modalImages[activePhotoIndex] || "/images/category-ring.jpg"}
                                        alt={modalItem.name || "Jewellery"}
                                    />
                                    {modalImages.length > 1 && (
                                        <button
                                            className="modal-nav-btn modal-next"
                                            onClick={() => setActivePhotoIndex(prev => prev < modalImages.length - 1 ? prev + 1 : 0)}
                                        >›</button>
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
                                            <img
                                                key={i}
                                                src={img}
                                                alt={`View ${i + 1}`}
                                                className={`modal-thumb ${i === activePhotoIndex ? "active" : ""}`}
                                                onClick={() => setActivePhotoIndex(i)}
                                            />
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
                                >
                                    <span>🟢</span> Enquire on WhatsApp
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
