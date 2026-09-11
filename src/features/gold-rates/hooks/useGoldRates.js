import { useState, useEffect, useCallback } from "react";
import { fetchGoldRates } from "../services/goldRatesService";

export function useGoldRates(pollIntervalMs = 60000) {
    const [rates, setRates] = useState(null);
    const [updatedAt, setUpdatedAt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadRates = useCallback(async () => {
        try {
            const data = await fetchGoldRates();
            if (data?.goldRates) {
                setRates(data.goldRates);
                setUpdatedAt(data.updatedAt);
                setError(null);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadRates();
        const interval = setInterval(loadRates, pollIntervalMs);
        return () => clearInterval(interval);
    }, [loadRates, pollIntervalMs]);

    return { rates, updatedAt, loading, error, reload: loadRates };
}
