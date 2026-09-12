export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://krishnajwellersbackend.onrender.com";

export function getAdminToken() {
    return localStorage.getItem("kj_admin_token") || "";
}

export function setAdminToken(token) {
    if (token) {
        localStorage.setItem("kj_admin_token", token);
    } else {
        localStorage.removeItem("kj_admin_token");
    }
}

export function getImageUrl(imagePath) {
    if (!imagePath) return "";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://") || imagePath.startsWith("data:")) {
        return imagePath;
    }
    const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
    return `${API_BASE_URL}/${cleanPath}`;
}

export async function adminRequest(endpoint, options = {}) {
    const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
    const token = getAdminToken();
    
    const headers = {
        ...(token ? { 
            "x-admin-token": token,
            "Authorization": `Bearer ${token}`
        } : {}),
        ...(options.headers || {})
    };

    if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    try {
        const response = await fetch(url, {
            credentials: "include",
            ...options,
            headers
        });

        const data = await response.json().catch(() => ({}));

        if (response.status === 401) {
            setAdminToken(null);
            throw new Error(data.message || "Admin session expired. Please log in again.");
        }

        if (!response.ok) {
            throw new Error(data.message || `Admin request failed: ${response.status}`);
        }

        return data;
    } catch (err) {
        console.error(`[Admin API Error] ${endpoint}:`, err.message);
        throw err;
    }
}
