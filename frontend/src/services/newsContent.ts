import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyBff7IpeDHBwtPD8fVoAbfwKBLDcmM3zzU';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export interface NewsArticle {
    id: string;
    headline: string;
    source: string;
    timestamp: string;
    summary: string;
    ticker: string;
    sector: string;
    newsType: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    change: string;
}

interface CacheEntry {
    data: NewsArticle[];
    expiry: number;
}

const newsCache: Record<string, CacheEntry> = {};
const TTL = 5 * 60 * 1000; // 5 minutes in ms

const MOCK_ARTICLES: NewsArticle[] = [
    {
        id: 'm1',
        headline: "Reliance Industries Announces Mega Expansion in Green Energy",
        source: "Economic Times",
        timestamp: new Date().toISOString(),
        summary: "RIL set to invest $10B in new solar-to-hydrogen gigafactory. Analysts predict long-term margin expansion.",
        ticker: "RELIANCE",
        sector: "Energy",
        newsType: "Market Updates",
        sentiment: "positive",
        change: "+2.1%"
    },
    {
        id: 'm2',
        headline: "HDFC Bank Reports Robust Q3 Earnings, Beats Estimates",
        source: "LiveMint",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        summary: "Net profit rose 18% YoY driven by strong retail loan growth and improved net interest margins.",
        ticker: "HDFCBANK",
        sector: "Banking",
        newsType: "Earnings",
        sentiment: "positive",
        change: "+1.8%"
    },
    {
        id: 'm3',
        headline: "TCS Wins $2B Multi-Year Digital Transformation Deal",
        source: "CNBC TV18",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        summary: "India's largest IT exporter secures a landmark contract with a major European retail giant.",
        ticker: "TCS",
        sector: "Technology",
        newsType: "Market Updates",
        sentiment: "positive",
        change: "+0.9%"
    },
    {
        id: 'm4',
        headline: "Adani Enterprises Shares Surge Amid Global Logistics Expansion",
        source: "Reuters",
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        summary: "The conglomerate completes strategic acquisition of key port terminal in Southeast Asia.",
        ticker: "ADANIENT",
        sector: "Infrastructure",
        newsType: "Mergers",
        sentiment: "positive",
        change: "+3.4%"
    },
    {
        id: 'm5',
        headline: "Infosys Lowers Revenue Guidance Citing Macro Uncertainties",
        source: "Bloomberg",
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        summary: "IT bellwether cautions about slower decision-making in the BFSI segment across North America.",
        ticker: "INFY",
        sector: "IT",
        newsType: "Analyst Ratings",
        sentiment: "negative",
        change: "-2.5%"
    },
    {
        id: 'm6',
        headline: "Zomato Breaks Even, Reports First Quarterly Profit",
        source: "Business Standard",
        timestamp: new Date(Date.now() - 18000000).toISOString(),
        summary: "Food delivery giant surprises street with disciplined cost control and Blinkit growth.",
        ticker: "ZOMATO",
        sector: "FMCG",
        newsType: "Earnings",
        sentiment: "positive",
        change: "+5.1%"
    },
    {
        id: 'm7',
        headline: "Tata Motors Unveils New High-Performance Electric Platform",
        source: "Autocar India",
        timestamp: new Date(Date.now() - 21600000).toISOString(),
        summary: "The Acti.ev platform will underpin future passenger vehicles with 500km+ range.",
        ticker: "TATAMOTORS",
        sector: "Auto",
        newsType: "Market Updates",
        sentiment: "positive",
        change: "+1.2%"
    },
    {
        id: 'm8',
        headline: "Sebi Tightens IPO Norms to Protect Retail Investors",
        source: "Moneycontrol",
        timestamp: new Date(Date.now() - 25200000).toISOString(),
        summary: "New regulations focus on stricter price band disclosure and anchor investor lock-ins.",
        ticker: "MARKET",
        sector: "Metal",
        newsType: "IPO",
        sentiment: "neutral",
        change: "0.0%"
    },
    {
        id: 'm9',
        headline: "Sun Pharma Receives FDA Approval for Dermatological Drug",
        source: "ET Health",
        timestamp: new Date(Date.now() - 28800000).toISOString(),
        summary: "U.S. health regulator clears generic version of top-selling psoriasis treatment.",
        ticker: "SUNPHARMA",
        sector: "Pharma",
        newsType: "Market Updates",
        sentiment: "positive",
        change: "+1.5%"
    },
    {
        id: 'm10',
        headline: "ITC Declares Interim Dividend, Shares Hit 52-Week High",
        source: "NDTV Profit",
        timestamp: new Date(Date.now() - 32400000).toISOString(),
        summary: " FMCG major distributes surplus cash after record-breaking performance in hotel segment.",
        ticker: "ITC",
        sector: "FMCG",
        newsType: "Dividends",
        sentiment: "positive",
        change: "+0.8%"
    },
    {
        id: 'm11',
        headline: "Vedanta Limited Announces Massive Demerger Plan",
        source: "Financial Express",
        timestamp: new Date(Date.now() - 36000000).toISOString(),
        summary: "The mining giant will split into six independent listed entities to unlock value.",
        ticker: "VEDL",
        sector: "Metal",
        newsType: "Mergers",
        sentiment: "neutral",
        change: "-0.5%"
    },
    {
        id: 'm12',
        headline: "DLF Sees Record Luxury Housing Sales in NCR Region",
        source: "The Hindu",
        timestamp: new Date(Date.now() - 39600000).toISOString(),
        summary: "Real estate major sells out new phase of premium project within 48 hours of launch.",
        ticker: "DLF",
        sector: "Realty",
        newsType: "Market Updates",
        sentiment: "positive",
        change: "+2.7%"
    }
];

export const fetchStockNews = async ({
    query = '',
    sector = 'All Sectors',
    timeRange = 'Today',
    newsType = 'All Types'
}: {
    query?: string;
    sector?: string;
    timeRange?: string;
    newsType?: string;
}): Promise<NewsArticle[]> => {
    const cacheKey = `${query}|${sector}|${timeRange}|${newsType}`;

    // Check Cache
    if (newsCache[cacheKey] && newsCache[cacheKey].expiry > Date.now()) {
        console.log('Cache Hit for:', cacheKey);
        return newsCache[cacheKey].data;
    }

    const prompt = `Return exactly 12 realistic Indian stock market news articles as a raw JSON array only. 
No markdown (no \`\`\`json), no explanation, just the [].
Search Query: ${query || 'None'}
Sector: ${sector}
Time Range: ${timeRange}
News Category: ${newsType}

Each object MUST have these exact fields:
- id: string
- headline: string
- source: string
- timestamp: ISO 8601 string (realistic recent dates based on ${timeRange})
- summary: 2-3 sentence description
- ticker: stock ticker symbol (e.g. RELIANCE, TCS, HDFCBANK)
- sector: industry sector
- newsType: category (Earnings, Mergers, etc.)
- sentiment: positive, negative, or neutral
- change: percentage string (e.g. +1.5%, -0.4%)

Ensure articles are relevant to the query "${query}" and sector "${sector}" if provided.
Sort results by timestamp descending so newest appears first.`;

    try {
        const response = await axios.post(GEMINI_ENDPOINT, {
            contents: [{
                parts: [{ text: prompt }]
            }],
            generationConfig: {
                temperature: 0.7,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 8192,
                responseMimeType: "application/json"
            }
        });

        const rawText = response.data.candidates[0].content.parts[0].text;
        const articles: NewsArticle[] = JSON.parse(rawText);

        // Update Cache
        newsCache[cacheKey] = {
            data: articles,
            expiry: Date.now() + TTL
        };

        return articles;
    } catch (error) {
        console.error('Gemini API Error - Falling back to MOCK_ARTICLES:', error);
        // Fallback to mock data with filtering logic
        return MOCK_ARTICLES.filter(a => {
            const matchesQuery = !query ||
                a.ticker.toLowerCase().includes(query.toLowerCase()) ||
                a.headline.toLowerCase().includes(query.toLowerCase()) ||
                a.summary.toLowerCase().includes(query.toLowerCase());

            const matchesSector = sector === 'All Sectors' || a.sector === sector ||
                (sector === 'IT' && (a.sector === 'Technology' || a.sector === 'IT'));

            const matchesType = newsType === 'All Types' || a.newsType === newsType;

            return matchesQuery && matchesSector && matchesType;
        });
    }
};
