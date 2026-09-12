// Base URL defaults to local backend or production Render URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://krishnajwellersbackend.onrender.com";

export function getImageUrl(imagePath) {
    if (!imagePath) return "/category-ring.jpg";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://") || imagePath.startsWith("data:")) {
        return imagePath;
    }
    const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
    return `${API_BASE_URL}/${cleanPath}`;
}

export async function apiRequest(endpoint, options = {}) {
    const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
    
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.message || `Request failed with status ${response.status}`);
        }

        return data;
    } catch (err) {
        console.error(`[API Error] ${endpoint}:`, err.message);
        throw err;
    }
}
