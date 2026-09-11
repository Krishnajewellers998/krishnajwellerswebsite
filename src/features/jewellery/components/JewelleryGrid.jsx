import React, { useState } from "react";
import { Search, Sparkles, Filter } from "lucide-react";
import { JewelleryCard } from "./JewelleryCard";
import { JewelleryDetailModal } from "./JewelleryDetailModal";
import { useJewellery } from "../hooks/useJewellery";

export function JewelleryGrid({ selectedCategory, onSelectCategory, categories = [] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeModalItem, setActiveModalItem] = useState(null);

    const { items, loading, error } = useJewellery({
        category: selectedCategory,
        search: searchQuery
    });

    return (
        <section className="jewellery-section" id="collection">
            <div className="section-header">
                <span className="section-subtitle">EXCLUSIVE MASTERPIECES</span>
                <h2 className="section-title">
                    {selectedCategory === "All" ? "All Jewellery Designs" : `${selectedCategory} Collection`}
                </h2>
                <div className="gold-accent-line"></div>
            </div>

            {/* Filter Bar */}
            <div className="catalog-controls">
                <div className="search-bar-wrap">
                    <Search size={18} className="search-icon" />
                    <input 
                        type="text"
                        placeholder="Search jewellery by name, design, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    {searchQuery && (
                        <button className="clear-search" onClick={() => setSearchQuery("")}>×</button>
                    )}
                </div>

                <div className="category-pills">
                    <button 
                        className={`pill-btn ${selectedCategory === "All" ? "active" : ""}`}
                        onClick={() => onSelectCategory("All")}
                    >
                        All
                    </button>
                    {categories.map((cat, idx) => {
                        const name = typeof cat === "string" ? cat : cat.name;
                        return (
                            <button 
                                key={idx}
                                className={`pill-btn ${selectedCategory === name ? "active" : ""}`}
                                onClick={() => onSelectCategory(name)}
                            >
                                {name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="jewellery-grid-skeleton">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="skeleton-jewellery-card" />
                    ))}
                </div>
            ) : items.length === 0 ? (
                <div className="empty-state">
                    <Sparkles size={40} className="empty-icon" />
                    <h3>No Jewellery Found</h3>
                    <p>
                        {searchQuery 
                            ? `No designs matching "${searchQuery}". Try a different keyword.` 
                            : `No products listed in "${selectedCategory}" currently.`}
                    </p>
                    {(searchQuery || selectedCategory !== "All") && (
                        <button 
                            className="reset-btn"
                            onClick={() => { setSearchQuery(""); onSelectCategory("All"); }}
                        >
                            Reset Filters
                        </button>
                    )}
                </div>
            ) : (
                <div className="jewellery-grid">
                    {items.map(item => (
                        <JewelleryCard 
                            key={item.id} 
                            item={item} 
                            onClick={setActiveModalItem}
                        />
                    ))}
                </div>
            )}

            {/* Detail Modal */}
            {activeModalItem && (
                <JewelleryDetailModal 
                    item={activeModalItem} 
                    onClose={() => setActiveModalItem(null)} 
                />
            )}
        </section>
    );
}
