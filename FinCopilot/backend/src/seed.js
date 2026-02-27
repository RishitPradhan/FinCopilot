const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const CommunityPost = require('./models/CommunityPost');

const demoPosts = [
    {
        title: "Nifty 50 Analysis: Resistance at 22,500?",
        content: "Watching the Nifty 50 closely today. We're seeing strong resistance near the 22,500 mark. If it breaks with high volume, we could see a rally towards 23k. What are your thoughts on the current sentiment? Bullish or cautious?",
        tags: ["Nifty50", "TechnicalAnalysis", "StockMarket"]
    },
    {
        title: "Bitcoin Halving: My Prediction",
        content: "With the halving approaching, history suggests a significant supply shock. I'm accumulating in the dips. Target remains $100k by EOY. Anyone else playing the long game here or looking for short-term scalps?",
        tags: ["Crypto", "Bitcoin", "Investing"]
    },
    {
        title: "Top 3 Midcap Stocks for 2024",
        content: "I've been scanning the midcap space and found three companies with consistent double-digit growth and low P/E ratios. (Not financial advice). Would you like me to share a detailed deep dive on their fundamentals?",
        tags: ["Stocks", "Midcaps", "WealthBuilding"]
    },
    {
        title: "The Psychology of Panic Selling",
        content: "The hardest part of trading isn't reading the charts, it's managing your own emotions. I lost 20% of my portfolio in 2022 because of panic selling. Now, I have a strict stop-loss and I never trade without a plan. Stay disciplined!",
        tags: ["Psychology", "Trading", "Discipline"]
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fincopilot');
        console.log('Connected to MongoDB');

        let user = await User.findOne();
        if (!user) {
            console.log('No users found. Creating a demo user via direct collection access...');
            const demoUser = {
                name: 'Financial Wizard',
                email: 'wizard@fincopilot.com',
                password: 'hashed_password_placeholder', // Direct insert bypasses hooks
                riskAppetite: 'aggressive',
                iqScore: 85,
                createdAt: new Date()
            };
            const result = await User.collection.insertOne(demoUser);
            user = await User.findById(result.insertedId);
        }

        console.log(`Using user ${user.name} (${user.email}) as author.`);

        const posts = demoPosts.map(p => ({
            ...p,
            author: user._id,
            likes: [],
            comments: [],
            createdAt: new Date()
        }));

        await CommunityPost.insertMany(posts);
        console.log('✅ Successfully seeded community with demo posts!');

        process.exit(0);
    } catch (err) {
        console.error('SEEDING FAILED:', err);
        process.exit(1);
    }
}

seed();
