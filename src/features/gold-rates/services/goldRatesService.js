// Direct live gold rates fetcher from live broadcast URL
// (Directly in browser via real URL, not from backend, no fake default rates)

const LIVE_GOLD_STREAM_URL =
    "https://bcast.pankajchain.com:7768/VOTSBroadcastStreaming/Services/xml/GetLiveRateByTemplateID/pankajchain";

/**
 * Fetches real-time gold rates directly from the live broadcast URL.
 * Parses "GOLD 99.50 CASH BHAV" for live bullion rates.
 */
export async function fetchGoldRates() {
    const url = `${LIVE_GOLD_STREAM_URL}?_=${Date.now()}`;

    const response = await fetch(url, {
        headers: {
            "Accept": "text/plain, */*; q=0.01"
        }
    });

    if (!response.ok) {
        throw new Error(`Live stream HTTP error: ${response.status}`);
    }

    const text = await response.text();

    // Line format: 6335  GOLD 99.50 CASH BHAV  <BUY> <SELL> <HIGH> <LOW>
    const match = text.match(
        /6335\s+GOLD\s+99\.50\s+CASH\s+BHAV\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/i
    );

    if (!match) {
        throw new Error("GOLD 99.50 CASH BHAV line not found in live stream response.");
    }

    const sell = Number(match[2]);
    const rate24 = Math.round(sell);
    const rate22 = Math.round((rate24 * 22) / 24);
    const rate18 = Math.round((rate24 * 18) / 24);

    return {
        goldRates: {
            "24K": rate24,
            "22K": rate22,
            "18K": rate18
        },
        updatedAt: new Date().toISOString()
    };
}
