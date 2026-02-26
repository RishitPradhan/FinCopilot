import axios from 'axios';
import { MarketAlert, AlertSeverity } from '@/store/useAlertStore';
import { NewsArticle } from './newsContent';

const GEMINI_API_KEY = 'AIzaSyBff7IpeDHBwtPD8fVoAbfwKBLDcmM3zzU';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export const analyzeNewsForAlerts = async (articles: NewsArticle[]): Promise<MarketAlert[]> => {
    if (articles.length === 0) return [];

    const prompt = `Analyze these ${articles.length} Indian stock market news articles and identify any High or Critical events.
Events to look for: Market crashes, RBI policy changes, major circuit breakers, bankruptcies, or significant geopolitical disruptions.

Return exactly a raw JSON array of objects for ONLY the articles that qualify as 'High' or 'Critical'. 
For everything else, EXCLUDE IT.

Classification Rules:
- Critical: Market-wide crashes, sudden policy shocks, massive bankruptcies.
- High: Major sector shifts, significant regulatory changes, large-scale mergers with market impact.
- Normal: Everything else (EXCLUDE).

JSON Structure for each object:
- id: match the news article id
- headline: original headline
- description: a concise 1-sentence explanation of why this is high/critical
- affectedSector: the primary sector affected (e.g. Banking, IT, All)
- severity: "High" or "Critical"
- timestamp: the original timestamp

Articles to analyze:
${JSON.stringify(articles.map(a => ({ id: a.id, headline: a.headline, summary: a.summary })), null, 2)}

Return raw JSON only, no markdown, no explanation.`;

    try {
        const response = await axios.post(GEMINI_ENDPOINT, {
            contents: [{
                parts: [{ text: prompt }]
            }],
            generationConfig: {
                temperature: 0.1, // Low temperature for consistent classification
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 2048,
                responseMimeType: "application/json"
            }
        });

        const rawText = response.data.candidates[0].content.parts[0].text;
        const potentialAlerts = JSON.parse(rawText);

        // Map to MarketAlert interface
        return potentialAlerts.map((a: any) => ({
            ...a,
            isRead: false,
            isDismissed: false
        }));
    } catch (error) {
        console.error('Alert Classification Error:', error);
        return []; // Fail silently to not break news page
    }
};
