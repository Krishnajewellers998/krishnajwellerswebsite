import React, { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { API_BASE_URL, getImageUrl } from "../../../shared/services/apiClient";

export function CategoryCollectionSection({ onSelectCategory }) {
    const { categories, loading } = useCategories();
    const [showAll, setShowAll] = useState(false);

    const displayedCategories = showAll ? categories : categories.slice(0, 6);

    const getCategoryImage = (cat) => {
        return getImageUrl(cat.image);
    };

    return (
        <section className="section collection" id="collection">
            <div className="section-heading">
                <div className="section-label">
                    Our Collection
                </div>
                <h2>
                    Jewellery Collection
                </h2>
                <p>
                    Explore our jewellery designs category-wise and discover something special for every occasion.
                </p>
            </div>

            <div className="categories" id="categoryContainer">
                {loading && categories.length === 0 ? (
                    <p style={{ textAlign: "center", gridColumn: "1 / -1", color: "#999" }}>
                        Loading categories...
                    </p>
                ) : (
                    displayedCategories.map((cat, idx) => (
                        <div 
                            key={cat.id || idx} 
                            className="category-card"
                            onClick={() => onSelectCategory(cat.name)}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                className="category-image"
                                src={getCategoryImage(cat)}
                                alt={cat.name}
                                loading="lazy"
                                onError={(e) => { e.target.src = "/images/category-ring.jpg"; }}
                            />
                            <div className="category-info">
                                <h3>{cat.name}</h3>
                                <div className="category-link">
                                    Explore Collection →
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {categories.length > 6 && (
                <button
                    className="view-all-categories"
                    id="viewAllButton"
                    style={{ display: "block" }}
                    onClick={() => setShowAll(prev => !prev)}
                >
                    {showAll ? "Show Less" : "View All Categories"}
                </button>
            )}
        </section>
    );
}

export default CategoryCollectionSection;
