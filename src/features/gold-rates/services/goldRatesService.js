import { apiRequest } from "../../../shared/services/apiClient";

export async function fetchGoldRates() {
    return await apiRequest("/api/gold-rates");
}
