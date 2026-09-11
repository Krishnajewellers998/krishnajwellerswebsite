import React from "react";
import { ArrowRight } from "lucide-react";
import { getImageUrl } from "../../../shared/services/apiClient";

export function CategoryCard({ category, onSelect, isSelected }) {
    const name = typeof category === "string" ? category : category?.name || "";
    const imagePath = typeof category === "object" ? category?.image : "";
    const imageUrl = getImageUrl(imagePath);

    return (
        <div 
            className={`category-card ${isSelected ? "active" : ""}`}
            onClick={() => onSelect(name)}
        >
            <div className="category-img-wrap">
                <img 
                    src={imageUrl} 
                    alt={name} 
                    loading="lazy"
                    onError={(e) => { e.target.src = "/category-ring.jpg"; }}
                />
                <div className="category-overlay" />
            </div>
            <div className="category-details">
                <h3>{name}</h3>
                <span className="category-cta">
                    Explore Collection <ArrowRight size={14} className="arrow" />
                </span>
            </div>
        </div>
    );
}
