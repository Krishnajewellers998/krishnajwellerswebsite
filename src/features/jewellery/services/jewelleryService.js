import { apiRequest } from "../../../shared/services/apiClient";

export async function fetchJewellery({ category = "", search = "", page = 1, limit = 100 } = {}) {
    const params = new URLSearchParams();
    if (category && category !== "All") params.append("category", category);
    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);

    const query = params.toString() ? `?${params.toString()}` : "";
    return await apiRequest(`/api/jewellery${query}`);
}
