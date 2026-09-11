import React from "react";
import { CategoryCard } from "./CategoryCard";
import { useCategories } from "../hooks/useCategories";

export function CategoryGrid({ selectedCategory, onSelectCategory }) {
    const { categories, loading, error } = useCategories();

    if (loading) {
        return (
            <div className="category-skeleton-grid">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="skeleton-card" />
                ))}
            </div>
        );
    }

    if (error && categories.length === 0) {
        return null;
    }

    return (
        <section className="categories-section" id="categories">
            <div className="section-header">
                <span className="section-subtitle">TIMELESS CREATIONS</span>
                <h2 className="section-title">Explore by Category</h2>
                <div className="gold-accent-line"></div>
            </div>

            <div className="categories-grid">
                {/* 'All' option */}
                <div 
                    className={`category-card all-card ${selectedCategory === "All" ? "active" : ""}`}
                    onClick={() => onSelectCategory("All")}
                >
                    <div className="all-card-inner">
                        <h3>View All Collections</h3>
                        <p>Browse full jewelry portfolio</p>
                    </div>
                </div>

                {categories.map((cat, idx) => (
                    <CategoryCard 
                        key={idx} 
                        category={cat} 
                        onSelect={onSelectCategory}
                        isSelected={selectedCategory === (typeof cat === "string" ? cat : cat.name)}
                    />
                ))}
            </div>
        </section>
    );
}
