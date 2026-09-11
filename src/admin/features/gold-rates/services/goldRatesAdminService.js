import { adminRequest } from "../../../shared/services/apiClient";

export async function fetchGoldRates() {
    return await adminRequest("/api/gold-rates");
}

export async function updateGoldRates(rates) {
    return await adminRequest("/api/gold-rates", {
        method: "POST",
        body: JSON.stringify(rates)
    });
}
