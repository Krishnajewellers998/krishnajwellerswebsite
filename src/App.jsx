import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./shared/components/Navbar";
import { GoldRatesSection } from "./features/gold-rates/components/GoldRatesSection";
import { SearchSection } from "./features/home/components/SearchSection";
import { CategoryCollectionSection } from "./features/categories/components/CategoryCollectionSection";
import { CategoryProductsView } from "./features/jewellery/components/CategoryProductsView";
import { FamilySection } from "./features/home/components/FamilySection";
import { VisitContactSection } from "./features/home/components/VisitContactSection";
import { Footer } from "./shared/components/Footer";
import { AdminApp } from "./admin/AdminApp";

function Storefront() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSelectCategory = (catName) => {
        setSelectedCategory(catName);
        setSearchQuery("");
        window.scrollTo({ top: 400, behavior: "smooth" });
    };

    const handleSearch = (query) => {
        if (!query) {
            setSearchQuery("");
            return;
        }
        setSearchQuery(query);
        setSelectedCategory(null);
        window.scrollTo({ top: 400, behavior: "smooth" });
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
        setSearchQuery("");
        const el = document.getElementById("collection");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleResetHome = () => {
        setSelectedCategory(null);
        setSearchQuery("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const isViewingProducts = Boolean(selectedCategory || searchQuery);

    return (
        <div className="website-root" id="top">
            {/* 100% Exact Header */}
            <Navbar onResetHome={handleResetHome} />

            <main>
                {/* 100% Exact Live Gold Rates & Banner */}
                <GoldRatesSection />

                {/* 100% Exact Sticky Search Bar */}
                <SearchSection onSearch={handleSearch} />

                {/* Either Products View (Category / Search) or Main Categories Grid */}
                {isViewingProducts ? (
                    <CategoryProductsView
                        category={selectedCategory}
                        searchQuery={searchQuery}
                        onBack={handleBackToCategories}
                        onSearch={handleSearch}
                    />
                ) : (
                    <CategoryCollectionSection onSelectCategory={handleSelectCategory} />
                )}

                {/* 100% Exact Family Section */}
                <FamilySection />

                {/* 100% Exact Location & Contact Combined Section */}
                <VisitContactSection />
            </main>

            {/* 100% Exact Footer */}
            <Footer />
        </div>
    );
}

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Admin Console Route */}
                <Route path="/admin/*" element={<AdminApp />} />
                {/* 100% Identical Customer Storefront Route */}
                <Route path="/*" element={<Storefront />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
