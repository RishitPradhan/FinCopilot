const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./src/models/User');
const CommunityPost = require('./src/models/CommunityPost');

const firstNames = ['Arjun', 'Deepak', 'Sneha', 'Rohan', 'Priyanka', 'Vikram', 'Ananya', 'Karthik', 'Meera', 'Aditya', 'Sanya', 'Rajesh', 'Ishita', 'Manoj', 'Kavita', 'Suresh', 'Pooja', 'Rahul', 'Nisha', 'Aman'];
const lastNames = ['Sharma', 'Verma', 'Gupta', 'Iyer', 'Prasad', 'Reddy', 'Nair', 'Patel', 'Deshmukh', 'Singh', 'Kapoor', 'Malhotra', 'Joshi', 'Choudhary', 'Rao', 'Kulkarni', 'Bose', 'Chatterjee', 'Das', 'Pandey'];

const topics = [
    {
        category: 'Stock Analysis',
        titles: [
            "Why I'm Bullish on HDFC Bank right now",
            "Reliance Industries: A technical breakdown",
            "Smallcap gems to watch in the infra sector",
            "Is it time to exit IT stocks?",
            "Defense stocks rally: Bubble or beginning?",
            "Analyzing the recent surge in PSU banks",
            "Tata Motors vs Mahindra: The EV battle",
            "Fundamental analysis of upcoming IPOs",
            "Why I reduced my stake in FMCG stocks",
            "The impact of US Fed rates on Indian markets"
        ],
        contentPrefix: "Looking at the quarterly results, it's clear that ",
        tags: ["Stocks", "Investing", "StockMarket", "FundamentalAnalysis"]
    },
    {
        category: 'Macro Economy',
        titles: [
            "RBI's stance on inflation: My take",
            "Decoding the latest GDP growth numbers",
            "Global recession fears and their impact on India",
            "Why the Indian Rupee is showing resilience",
            "The future of India's manufacturing sector",
            "Impact of rising crude oil prices on fiscal deficit",
            "Agricultural reforms: A long-term market view",
            "How digital public infrastructure is driving growth",
            "The role of FDI in India's $5 trillion goal",
            "Demographic dividend vs Job creation: A debate"
        ],
        contentPrefix: "The current economic indicators suggest that ",
        tags: ["Economy", "Macro", "India", "Policy"]
    },
    {
        category: 'Personal Finance',
        titles: [
            "How to plan your taxes for the Next FY",
            "Mutual Fund vs Direct Equity: Which is better?",
            "The power of compounding: A 10-year study",
            "Term insurance vs Life insurance myths",
            "Why you need an emergency fund of 12 months",
            "Passive income streams through dividend stocks",
            "Retirement planning for 30-year-olds",
            "How to escape the credit card debt trap",
            "Index funds: The simplest way to build wealth",
            "Buying a house vs Renting in 2024"
        ],
        contentPrefix: "Financial freedom starts with small steps. ",
        tags: ["PersonalFinance", "Savings", "Wealth", "Planning"]
    },
    {
        category: 'Crypto & Web3',
        titles: [
            "Bitcoin's role in a balanced portfolio",
            "Ethereum's roadmap: What to expect",
            "The future of DeFi in India",
            "CBDC vs USDT: The battle for digital cash",
            "NFTs: Are they really dead or just evolving?",
            "Web3 social media: The next big thing?",
            "Blockchain usage in supply chain management",
            "Crypto regulations: Is a ban possible?",
            "Why I believe in Layer 2 scaling solutions",
            "Bitcoin as digital gold: A comparative study"
        ],
        contentPrefix: "The decentralized world is evolving rapidly. ",
        tags: ["Crypto", "Bitcoin", "Web3", "Blockchain"]
    },
    {
        category: 'Psychology',
        titles: [
            "Overcoming the fear of missing out (FOMO)",
            "The importance of a trading journal",
            "Why discipline beats intelligence in investing",
            "Managing expectations in a bull market",
            "The sunk cost fallacy in trading",
            "How to stay calm during market corrections",
            "Building high-conviction portfolios",
            "The psychological impact of leverage",
            "Why retail investors lose money: 3 common mistakes",
            "Mindset shifts for successful long-term investing"
        ],
        contentPrefix: "Investing is 90% psychology and 10% math. ",
        tags: ["Psychology", "Mindset", "Trading", "Discipline"]
    }
];

const generatePostContent = (prefix) => {
    const filler = [
        "We need to stay disciplined and follow our strategy regardless of short-term noise.",
        "The historical data shows a clear pattern that we can exploit for better returns.",
        "Most experts are overlooking the long-term potential of this specific sector.",
        "It's crucial to diversify and manage risk effectively in this volatile environment.",
        "I've noticed a significant shift in institutional behavior recently.",
        "Fundamental strength should always be the priority for any serious investor.",
        "The macro tailwinds are finally aligning in our favor.",
        "Emotional control is what separates winners from losers in this game.",
        "I recommend reading more about this before making any significant allocation."
    ];
    let content = prefix;
    for (let i = 0; i < 3; i++) {
        content += filler[Math.floor(Math.random() * filler.length)] + " ";
    }
    return content;
};

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fincopilot');
        console.log('Connected to MongoDB');

        // Clean existing posts (but keep users if needed, or clear some)
        // await CommunityPost.deleteMany({});
        // console.log('Cleared existing posts');

        const users = [];
        for (let i = 0; i < 50; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const name = `${firstName} ${lastName}`;
            const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@demo.com`;

            users.push({
                name,
                email,
                password: 'password123',
                riskAppetite: ['beginner', 'moderate', 'aggressive'][Math.floor(Math.random() * 3)],
                iqScore: Math.floor(Math.random() * 100) + 50
            });
        }

        const createdUsers = await User.insertMany(users);
        console.log(`✅ Created ${createdUsers.length} unique users.`);

        const posts = [];
        for (let i = 0; i < 50; i++) {
            const user = createdUsers[i % createdUsers.length];
            const topic = topics[Math.floor(Math.random() * topics.length)];
            const title = topic.titles[Math.floor(Math.random() * topic.titles.length)];

            // Randomly select 2-3 tags from the topic.tags
            const postTags = [...topic.tags].sort(() => 0.5 - Math.random()).slice(0, 3);

            // Add some engagement
            const likesCount = Math.floor(Math.random() * createdUsers.length / 2);
            const randomLikes = [...createdUsers].sort(() => 0.5 - Math.random()).slice(0, likesCount).map(u => u._id);

            const createdAt = new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000));

            posts.push({
                author: user._id,
                title,
                content: generatePostContent(topic.contentPrefix),
                tags: postTags,
                likes: randomLikes,
                comments: [],
                createdAt
            });
        }

        await CommunityPost.insertMany(posts);
        console.log(`✅ Created ${posts.length} unique financial posts.`);

        console.log('--- SEEDING COMPLETE ---');
        process.exit(0);
    } catch (err) {
        console.error('SEEDING FAILED:', err);
        process.exit(1);
    }
}

seed();
