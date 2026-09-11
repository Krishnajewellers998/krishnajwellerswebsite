import { adminRequest } from "../../../shared/services/apiClient";

export async function fetchCategories() {
    return await adminRequest("/api/categories");
}

export async function createCategory({ name, image, synonyms }) {
    return await adminRequest("/api/categories", {
        method: "POST",
        body: JSON.stringify({ name, image, synonyms })
    });
}

export async function updateCategory(oldName, updates) {
    return await adminRequest(`/api/categories/${encodeURIComponent(oldName)}`, {
        method: "PUT",
        body: JSON.stringify(updates)
    });
}

export async function deleteCategory(name) {
    return await adminRequest(`/api/categories/${encodeURIComponent(name)}`, {
        method: "DELETE"
    });
}

export async function uploadImageFile(file) {
    const formData = new FormData();
    formData.append("image", file);
    return await adminRequest("/api/upload-image", {
        method: "POST",
        body: formData
    });
}
