import React, { useState } from "react";
import { AuthProvider, useAuth } from "./features/auth/AuthContext";
import { LoginForm } from "./features/auth/components/LoginForm";
import { AdminLayout } from "./shared/components/AdminLayout";
import { DashboardStats } from "./features/dashboard/components/DashboardStats";
import { CategoryManager } from "./features/categories/components/CategoryManager";
import { JewelleryManager } from "./features/jewellery/components/JewelleryManager";
import "./admin.css";

function AdminDashboard() {
    const { isAuthenticated, loading } = useAuth();
    const [activeTab, setActiveTab] = useState("dashboard");

    if (loading) {
        return (
            <div className="login-page-container">
                <p style={{ color: "var(--admin-gold)" }}>Verifying admin authentication session...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <LoginForm />;
    }

    return (
        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            {activeTab === "dashboard" && <DashboardStats onNavigate={setActiveTab} />}
            {activeTab === "categories" && <CategoryManager />}
            {activeTab === "jewellery" && <JewelleryManager />}
        </AdminLayout>
    );
}

export function AdminApp() {
    return (
        <AuthProvider>
            <div className="admin-root-container">
                <AdminDashboard />
            </div>
        </AuthProvider>
    );
}

export default AdminApp;
