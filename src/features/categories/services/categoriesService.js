import { apiRequest } from "../../../shared/services/apiClient";

export async function fetchCategories() {
    return await apiRequest("/api/categories");
}
