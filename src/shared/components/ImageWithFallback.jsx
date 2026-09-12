import React, { useState } from "react";
import { PlaceholderImage } from "./PlaceholderImage";

export function ImageWithFallback({ src, alt, className = "", style = {} }) {
    const [error, setError] = useState(false);

    if (!src || error) {
        return <PlaceholderImage className={className} style={style} />;
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={style}
            loading="lazy"
            onError={() => setError(true)}
        />
    );
}

export default ImageWithFallback;
