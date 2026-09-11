import { adminRequest } from "../../../shared/services/apiClient";

export async function fetchJewellery({ category = "", search = "", page = 1, limit = 100 } = {}) {
    const params = new URLSearchParams();
    if (category && category !== "All") params.append("category", category);
    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);

    const q = params.toString() ? `?${params.toString()}` : "";
    return await adminRequest(`/api/jewellery${q}`);
}

export async function createJewellery(item) {
    return await adminRequest("/api/jewellery", {
        method: "POST",
        body: JSON.stringify(item)
    });
}

export async function updateJewellery(id, updates) {
    return await adminRequest(`/api/jewellery/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates)
    });
}

export async function deleteJewellery(id) {
    return await adminRequest(`/api/jewellery/${id}`, {
        method: "DELETE"
    });
}

export async function uploadJewelleryImage(file) {
    const formData = new FormData();
    formData.append("image", file);
    return await adminRequest("/api/upload-image", {
        method: "POST",
        body: formData
    });
}
