import { useState, useEffect, useCallback } from "react";
import { fetchJewellery } from "../services/jewelleryService";

export function useJewellery({ category = "All", search = "", limit = 12 } = {}) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const loadItems = useCallback(async (isLoadMore = false) => {
        try {
            if (isLoadMore) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }

            const currentPage = isLoadMore ? page + 1 : 1;
            const data = await fetchJewellery({ category, search, page: currentPage, limit });
            
            const fetchedItems = Array.isArray(data?.jewellery) ? data.jewellery : [];
            const fetchedHasMore = typeof data?.hasReachedMax === 'boolean' 
                ? !data.hasReachedMax 
                : fetchedItems.length === limit;

            if (isLoadMore) {
                setItems((prev) => [...prev, ...fetchedItems]);
                setPage(currentPage);
            } else {
                setItems(fetchedItems);
                setPage(1);
            }
            
            setHasMore(fetchedHasMore);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [category, search, page, limit]);

    useEffect(() => {
        const timeout = setTimeout(() => loadItems(false), search ? 300 : 0);
        return () => clearTimeout(timeout);
    }, [category, search, limit]); // Removed loadItems from dependencies to prevent infinite loops if not carefully managed, relying on primitive deps

    const loadMore = useCallback(() => {
        if (!loading && !loadingMore && hasMore) {
            loadItems(true);
        }
    }, [loading, loadingMore, hasMore, loadItems]);

    return { items, loading, loadingMore, error, hasMore, loadMore, reload: () => loadItems(false) };
}
