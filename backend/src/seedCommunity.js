const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const CommunityPost = require('./models/CommunityPost');

const expertNames = [
    "MacroWhale", "BullRunBrah", "ChartMaster_DX", "YieldHunter", "SigmaTrader",
    "AlphaSeeks", "QuantQueen", "NiftyNinja", "CryptoOracle", "ValueViking",
    "OptionsOcean", "DividendDude", "FinanceFlow", "MarketMaurya", "PortfolioPro"
];

const titles = [
    "Nifty 50: The 23k Breakout Potential",
    "Why I'm Bullish on India's Tech Sector",
    "BTC Halving: Supply Shock is Real",
    "Top 5 Dividend Stocks for Passive Income",
    "Risk Management: Dealing with 20% Drawdowns",
    "The Case for Gold in 2024",
    "Understanding the Inverted Yield Curve",
    "Hedged Strategies for Volatile Markets",
    "Smallcap Gems: High Risk, High Reward",
    "Macro Outlook: Recession or Soft Landing?",
    "Trading Psychology: Mastering FOMO",
    "How to Read a Balance Sheet like a Pro",
    "The Future of Institutional Crypto Adoption",
    "Real Estate vs REITs: The ROI Battle",
    "Portfolio Allocation for Aggressive Growth"
];

const contents = [
    "The technical indicators are lining up perfectly. Watch for the breakout at the previous high. Volume is confirming the move.",
    "Fundamental analysis suggests this company is undervalued by at least 30%. Debt-to-equity is low and FCF is growing.",
    "Market sentiment is currently at extreme greed. It might be time to take some profits and wait for a healthier pullback.",
    "Don't ignore the macro signals. The interest rate cycle is turning. Cyclical stocks should benefit in the next 12 months.",
    "Just shared my updated portfolio tracking sheet. Transparency is key in this community. Let's grow together!",
    "Managing risk is more important than chasing gains. A simple stop-loss saved my capital today. Protect your downside.",
    "Institutional money is flowing into emerging markets. India leads the pack with strong manufacturing PMI data.",
    "What's your take on the current inflation numbers? I'm shifting 10% more into inflation-protected securities.",
    "Learning to exit a bad trade is as important as finding a good one. Don't marry your stocks.",
    "The convergence of AI and Finance is the next multi-decade trend. Look for infrastructure players."
];

const tagsList = ["Stocks", "Crypto", "Macro", "Investing", "TechnicalAnalysis", "Wealth", "Economy", "Options", "Forex", "DeFi"];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fincopilot');
        console.log('Connected to MongoDB');

        // 1. Create Random Expert Users
        const users = [];
        for (const name of expertNames) {
            let user = await User.findOne({ email: `${name.toLowerCase()}@example.com` });
            if (!user) {
                user = await User.create({
                    name: name,
                    email: `${name.toLowerCase()}@example.com`,
                    password: 'demo_password_123',
                    riskAppetite: Math.random() > 0.5 ? 'aggressive' : 'moderate',
                    iqScore: Math.floor(Math.random() * 40) + 60,
                    createdAt: new Date()
                });
                console.log(`Created Expert: ${name}`);
            }
            users.push(user);
        }

        // 2. Clear existing posts to avoid duplicates for this demo
        await CommunityPost.deleteMany({});
        console.log('Cleared existing community posts.');

        // 3. Create 50 Random Posts
        const posts = [];
        for (let i = 0; i < 50; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomTitle = titles[Math.floor(Math.random() * titles.length)];
            const randomContent = contents[Math.floor(Math.random() * contents.length)];
            const randomTags = [];

            const numTags = Math.floor(Math.random() * 2) + 2;
            for (let j = 0; j < numTags; j++) {
                const tag = tagsList[Math.floor(Math.random() * tagsList.length)];
                if (!randomTags.includes(tag)) randomTags.push(tag);
            }

            // Generate some random likes (user IDs)
            const numLikes = Math.floor(Math.random() * users.length);
            const postLikes = [];
            for (let k = 0; k < numLikes; k++) {
                postLikes.push(users[k]._id);
            }

            posts.push({
                author: randomUser._id,
                title: `${randomTitle}`,
                content: `${randomContent} Stay ahead of the curve with our community intelligence. #${randomTags[0]}`,
                tags: randomTags,
                likes: postLikes,
                comments: [],
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000))
            });
        }

        await CommunityPost.insertMany(posts);
        console.log(`✅ Successfully seeded Community with 50 diverse posts across ${users.length} unique accounts!`);

        process.exit(0);
    } catch (err) {
        console.error('SEEDING FAILED:', err);
        process.exit(1);
    }
}

seed();
