import { adminRequest, setAdminToken } from "../../../shared/services/apiClient";

export async function loginAdmin(username, password) {
    const data = await adminRequest("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
    });
    if (data?.token) {
        setAdminToken(data.token);
    }
    return data;
}

export async function logoutAdmin() {
    try {
        await adminRequest("/api/admin/logout", { method: "POST" });
    } finally {
        setAdminToken(null);
    }
}

export async function checkAdminAuth() {
    try {
        const data = await adminRequest("/api/admin/me");
        return data?.authenticated || false;
    } catch (_) {
        return false;
    }
}
