import React from "react";
import { Eye, ShieldCheck } from "lucide-react";
import { getImageUrl } from "../../../shared/services/apiClient";

export function JewelleryCard({ item, onClick }) {
    const mainPhoto = Array.isArray(item.photos) && item.photos.length > 0 
        ? item.photos[0] 
        : (item.image || "");

    return (
        <div className="jewellery-card" onClick={() => onClick(item)}>
            <div className="jewellery-img-wrap">
                <img 
                    src={getImageUrl(mainPhoto)} 
                    alt={item.name} 
                    loading="lazy"
                    onError={(e) => { e.target.src = "/category-ring.jpg"; }}
                />
                <div className="jewellery-tag">{item.category || "Jewellery"}</div>
                <div className="jewellery-hover-action">
                    <span><Eye size={16} /> Quick View</span>
                </div>
            </div>

            <div className="jewellery-card-body">
                <h3 className="jewellery-name">{item.name}</h3>
                <div className="jewellery-meta">
                    <span className="purity-badge">
                        <ShieldCheck size={13} /> {item.purity || "22K BIS"}
                    </span>
                    {item.weight && <span className="weight-badge">{item.weight}</span>}
                </div>
            </div>
        </div>
    );
}
