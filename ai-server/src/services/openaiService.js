import OpenAI from 'openai'

// Check if API key is available
let apiKey = import.meta.env.VITE_OPENAI_API_KEY

if (!apiKey) {
  console.error('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env file')
  apiKey = 'dummy-key'
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
})

const SYSTEM_PROMPT = `You are Stocko, an expert AI financial advisor specializing in Indian stock market analysis, fintech insights, and investment guidance.

Your expertise includes:
- Stock analysis and technical/fundamental analysis
- Portfolio assessment and red flag identification
- Company financial reports and earnings summaries
- Market trends and economic indicators
- Risk management and investment strategies
- Real-time market insights

When responding:
1. Be direct, data-driven, and professional
2. Use clear formatting with bullet points where appropriate
3. Always cite data sources when discussing specific stocks
4. Provide actionable insights, not just information
5. For stock queries, NEVER use placeholder variables like X, Y, Z, or '₹X'. ALWAYS provide your best realistic estimated numbers based on historical data up to your knowledge cutoff.
6. Include relevant metrics (P/E ratio, market cap, EPS, Dividend Yield, etc.) with concrete estimated values.
7. Use the chart component for price visualizations when helpful
8. Always explain the "why" behind your analysis

Formatting guidelines:
- Use markdown for better readability
- Bold important metrics and conclusions
- Use bullet points for lists
- Keep paragraphs concise

Remember: You're helping Indian investors make informed decisions.`

export const sendMessageToGPT = async (userMessage, fileData = null, model = 'gpt-4o') => {
  // Check if API key is available
  if (!apiKey || apiKey === 'dummy-key' || apiKey === 'your_openai_api_key_here') {
    throw new Error('Please add your OpenAI API key to the .env file. Copy .env.example to .env and add your key.')
  }

  const messages = [
    {
      role: 'system',
      content: SYSTEM_PROMPT
    },
    {
      role: 'user',
      content: userMessage
    }
  ]

  const parameters = {
    model: model,
    messages: messages,
    temperature: 0.7,
    max_tokens: 2000,
    stream: true
  }

  if (fileData) {
    parameters.messages[1].content = [
      {
        type: 'text',
        text: userMessage
      },
      {
        type: 'image_url',
        image_url: {
          url: fileData
        }
      }
    ]
  }

  try {
    const stream = await openai.chat.completions.create(parameters)

    // Return an async generator for streaming
    return (async function* () {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || ''
        if (content) {
          yield content
        }
      }
    })()
  } catch (error) {
    console.error('OpenAI API Error:', error)
    throw new Error(`Failed to get response from Stocko: ${error.message}`)
  }
}

export const generateMockChartData = (symbol) => {
  // Different base prices for different symbols
  const symbolPrices = {
    'LENSKART': { base: 250, variance: 15 },
    'DMART': { base: 3500, variance: 200 },
    'TCS': { base: 4200, variance: 250 },
    'INFY': { base: 1800, variance: 100 },
    'WIPRO': { base: 420, variance: 30 },
    'RELIANCE': { base: 2800, variance: 150 },
    'HDFC': { base: 2400, variance: 120 },
    'JIOFINANCE': { base: 650, variance: 40 },
    'SENSEX': { base: 78000, variance: 5000 }
  }

  const config = symbolPrices[symbol] || symbolPrices['SENSEX']
  const basePrice = config.base
  const variance = config.variance
  const data = []

  for (let i = 0; i < 11; i++) {
    const randomVariance = (Math.random() - 0.5) * variance
    data.push({
      time: `${9 + Math.floor(i / 2)}:${i % 2 === 0 ? '30' : '00'}`,
      price: Math.round((basePrice + randomVariance) * 100) / 100,
      event: i === 3 ? 'Q3 Results' : i === 7 ? 'CEO Announcement' : null
    })
  }

  return data
}

export const parseResponseForChart = (text) => {
  // Check if response mentions price chart or stock visualization
  if (text.toLowerCase().includes('chart') && text.toLowerCase().includes('price')) {
    return true
  }
  return false
}

export const generateMockSnapshot = (symbol) => {
  // generate dynamic snapshot metrics based on symbol with some randomness
  const params = {
    'LENSKART': { base: 280, variance: 30 },
    'DMART': { base: 3650, variance: 300 },
    'TCS': { base: 4350, variance: 400 },
    'INFY': { base: 1850, variance: 200 },
    'WIPRO': { base: 450, variance: 50 },
    'RELIANCE': { base: 2900, variance: 250 },
    'HDFC': { base: 2500, variance: 200 },
    'JIOFINANCE': { base: 680, variance: 80 },
    'SENSEX': { base: 79500, variance: 8000 }
  }[symbol] || { base: 1000, variance: 100 }

  const lastPrice = Math.round((params.base + (Math.random() - 0.5) * params.variance) * 100) / 100
  const dayChange = Math.round((Math.random() - 0.5) * (params.variance / 10) * 100) / 100
  const prevClose = lastPrice - dayChange
  const dayChangePct = prevClose !== 0 ? ((dayChange / prevClose) * 100).toFixed(2) + '%' : '0%'
  const low = Math.round((lastPrice - Math.random() * (params.variance / 5)) * 100) / 100
  const high = Math.round((lastPrice + Math.random() * (params.variance / 5)) * 100) / 100
  const fiftyTwoWHigh = Math.round((params.base + params.variance * 1.5) * 100) / 100
  const fiftyTwoWLow = Math.round((params.base - params.variance * 1.5) * 100) / 100

  return {
    'Last Price': `₹${lastPrice}`,
    'Day Change': `${dayChange >= 0 ? '+' : ''}${dayChange}`,
    'Day Change %': dayChangePct,
    'Day Range': `₹${low} – ₹${high}`,
    '52W High': `₹${fiftyTwoWHigh}`,
    '52W Low': `₹${fiftyTwoWLow}`
  }
}

export const generateMockSentiment = (symbol) => {
  // create pseudo-random sentiment counts based on symbol hash
  let seed = symbol.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const rand = (max) => Math.floor((Math.sin(seed++) + 1) * 0.5 * max)
  const bearish = rand(5) + 1
  const neutral = rand(5) + 1
  const bullish = rand(10) + 1
  let level = 'neutral'
  if (bullish > bearish && bullish > neutral) level = 'bullish'
  else if (bearish > bullish && bearish > neutral) level = 'bearish'
  return { level, bearish, neutral, bullish }
}

export default sendMessageToGPT
