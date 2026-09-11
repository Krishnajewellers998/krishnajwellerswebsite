import { useState, useEffect, useCallback } from "react";
import { fetchCategories } from "../services/categoriesService";

export function useCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadCategories = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchCategories();
            setCategories(Array.isArray(data?.categories) ? data.categories : []);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    return { categories, loading, error, reload: loadCategories };
}
