import { useState, useEffect, useCallback } from "react";
import { fetchJewellery } from "../services/jewelleryService";

export function useJewellery({ category = "All", search = "" } = {}) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadItems = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchJewellery({ category, search });
            setItems(Array.isArray(data?.jewellery) ? data.jewellery : []);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [category, search]);

    useEffect(() => {
        const timeout = setTimeout(loadItems, search ? 300 : 0);
        return () => clearTimeout(timeout);
    }, [loadItems, search]);

    return { items, loading, error, reload: loadItems };
}
