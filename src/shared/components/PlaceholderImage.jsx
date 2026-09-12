import React from "react";
import { Gem } from "lucide-react";

export function PlaceholderImage({ className = "", style = {} }) {
    return (
        <div 
            className={`placeholder-image ${className}`}
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#FBF9F5", // AppColors.cream equivalent
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(212, 175, 55, 0.8)", // AppColors.goldDark equivalent
                ...style
            }}
        >
            <Gem size={30} style={{ opacity: 0.6 }} />
            <div style={{
                marginTop: "4px",
                fontSize: "10px",
                fontFamily: "serif",
                letterSpacing: "0.5px"
            }}>
                Krishna Jewellers
            </div>
        </div>
    );
}

export default PlaceholderImage;
