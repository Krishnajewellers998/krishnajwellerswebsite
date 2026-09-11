import React, { useState } from "react";

export function SearchSection({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        const trimmed = searchTerm.trim();
        if (onSearch) {
            onSearch(trimmed);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <section className="search-section">
            <div className="search-box">
                <input
                    type="text"
                    id="jewellerySearch"
                    placeholder="Search jewellery..."
                    autoComplete="off"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button type="button" onClick={handleSearch}>
                    🔍 Search
                </button>
            </div>
        </section>
    );
}

export default SearchSection;
