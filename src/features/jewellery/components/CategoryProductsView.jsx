import React, { useState, useMemo } from "react";
import { useJewellery } from "../hooks/useJewellery";

export function CategoryProductsView({ category, searchQuery, onBack, onSearch }) {
    const { jewellery, loading } = useJewellery();
    const [localSearch, setLocalSearch] = useState(searchQuery || "");
    const [visibleCount, setVisibleCount] = useState(20);
    const [modalItem, setModalItem] = useState(null);
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);

    // Filter products
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
        return `http://localhost:3000/${clean}`;
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
            return `http://localhost:3000/${clean}`;
        });
    };

    const openModal = (item) => {
        setModalItem(item);
        setActivePhotoIndex(0);
    };

    const closeModal = () => {
        setModalItem(null);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(localSearch.trim());
        }
    };

    const modalImages = modalItem ? getItemImages(modalItem) : [];

    const pageTitle = searchQuery
        ? `Search Results for "${searchQuery}"`
        : `${category} Collection`;

    return (
        <div>
            {/* Page Header */}
            <section className="page-header">
                <div className="page-label">
                    Our Collection
                </div>
                <h1 id="categoryTitle">
                    {pageTitle}
                </h1>
                <p>
                    Explore our beautiful designs
                </p>
            </section>

            {/* Products Section */}
            <section className="products-section">
                <div className="top-bar">
                    <button className="back-button" onClick={onBack}>
                        ← Back to Categories
                    </button>

                    <div className="product-count" id="productCount">
                        {loading ? "Loading..." : `${filteredProducts.length} designs available`}
                    </div>
                </div>

                <form className="category-search" onSubmit={handleSearchSubmit}>
                    <input
                        type="search"
                        placeholder="Search jewellery..."
                        autoComplete="off"
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                    />
                    <button type="submit">
                        🔍 Search
                    </button>
                </form>

                <div className="products" id="productsContainer">
                    {loading ? (
                        <p style={{ textAlign: "center", gridColumn: "1 / -1", color: "#999", padding: "40px" }}>
                            Loading jewellery items...
                        </p>
                    ) : filteredProducts.length === 0 ? (
                        <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "60px 20px" }}>
                            <p style={{ color: "#777", fontSize: "16px", marginBottom: "15px" }}>
                                No designs available matching your criteria.
                            </p>
                            <button className="back-button" onClick={onBack}>
                                View All Categories
                            </button>
                        </div>
                    ) : (
                        filteredProducts.slice(0, visibleCount).map((item, idx) => {
                            const firstImg = getProductImage(item);
                            return (
                                <div key={item.id || idx} className="product">
                                    {firstImg ? (
                                        <img
                                            src={firstImg}
                                            alt={item.name || "Jewellery"}
                                            className="product-image"
                                            onClick={() => openModal(item)}
                                            style={{ cursor: "pointer" }}
                                            onError={(e) => { e.target.src = "/images/category-ring.jpg"; }}
                                        />
                                    ) : (
                                        <div
                                            className="product-image"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#999"
                                            }}
                                        >
                                            No Photo
                                        </div>
                                    )}

                                    <div className="product-info">
                                        <h3>{item.name || "Jewellery"}</h3>
                                        {item.weight && (
                                            <span className="weight">
                                                ⚖ {item.weight} Gram
                                            </span>
                                        )}
                                        {item.description && (
                                            <p>{item.description}</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {filteredProducts.length > visibleCount && (
                    <button
                        id="loadMoreBtn"
                        type="button"
                        onClick={() => setVisibleCount(prev => prev + 20)}
                        style={{
                            display: "block",
                            margin: "30px auto 0",
                            padding: "12px 25px",
                            border: "none",
                            borderRadius: "8px",
                            background: "#111",
                            color: "#fff",
                            fontSize: "13px",
                            cursor: "pointer"
                        }}
                    >
                        Load More
                    </button>
                )}
            </section>

            {/* Modal */}
            {modalItem && (
                <div className="modal" id="imageModal" style={{ display: "flex" }}>
                    <div className="modal-content">
                        <button className="close-modal" onClick={closeModal}>
                            ×
                        </button>

                        {modalImages.length > 1 && (
                            <button
                                className="photo-nav photo-prev"
                                onClick={() => setActivePhotoIndex(prev => (prev > 0 ? prev - 1 : modalImages.length - 1))}
                            >
                                ‹
                            </button>
                        )}

                        <img
                            id="modalImage"
                            className="modal-image"
                            src={modalImages[activePhotoIndex] || "/images/category-ring.jpg"}
                            alt={modalItem.name || "Jewellery"}
                        />

                        {modalImages.length > 1 && (
                            <button
                                className="photo-nav photo-next"
                                onClick={() => setActivePhotoIndex(prev => (prev < modalImages.length - 1 ? prev + 1 : 0))}
                            >
                                ›
                            </button>
                        )}

                        {modalImages.length > 1 && (
                            <div className="photo-counter" id="photoCounter">
                                {activePhotoIndex + 1} / {modalImages.length}
                            </div>
                        )}

                        {modalImages.length > 1 && (
                            <div className="modal-gallery" id="modalGallery">
                                {modalImages.map((img, i) => (
                                    <img
                                        key={i}
                                        src={img}
                                        alt={`Thumbnail ${i + 1}`}
                                        className={`gallery-thumb ${i === activePhotoIndex ? "active" : ""}`}
                                        onClick={() => setActivePhotoIndex(i)}
                                        style={{
                                            width: "45px",
                                            height: "45px",
                                            objectFit: "cover",
                                            margin: "0 4px",
                                            border: i === activePhotoIndex ? "2px solid var(--gold)" : "1px solid #ddd",
                                            borderRadius: "4px",
                                            cursor: "pointer"
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        <div className="modal-info">
                            <h2 id="modalName">{modalItem.name || "Jewellery"}</h2>
                            {modalItem.description && <p id="modalDescription">{modalItem.description}</p>}
                            {modalItem.weight && <p id="modalWeight"><strong>Weight:</strong> {modalItem.weight} Gram</p>}
                            {modalItem.purity && <p><strong>Purity:</strong> {modalItem.purity}</p>}

                            <a
                                id="modalWhatsapp"
                                href={`https://wa.me/919984123388?text=${encodeURIComponent(`Hello Krishna Jewellers, I am interested in: ${modalItem.name || "Jewellery"} (Weight: ${modalItem.weight || "N/A"}g). Please share price and details.`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="whatsapp-btn"
                            >
                                🟢 Enquire on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CategoryProductsView;
