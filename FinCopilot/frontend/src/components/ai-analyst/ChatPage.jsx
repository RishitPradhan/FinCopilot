import React, { useState, useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import BotResponse from './BotResponse'
import ChatInputBar from './ChatInputBar'
import TypingIndicator from './TypingIndicator'
import { sendMessageToGPT, generateMockChartData, generateMockSnapshot, generateMockSentiment } from '@/services/ai/openaiService'
import { ArrowUp } from 'lucide-react'

export const ChatPage = ({ onChatHistoryOpen, initialMessage }) => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)
  const [currentModel, setCurrentModel] = useState('gpt-4o')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (initialMessage) {
      handleSendMessage(initialMessage)
    }
  }, [initialMessage])

  const handleSendMessage = async (userText, file = null) => {
    if (!userText.trim() && !file) return

    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })

    // Add user message
    const userMessage = {
      type: 'user',
      content: userText,
      timestamp
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      let fileData = null

      // Convert file to base64 if present
      if (file) {
        fileData = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      }

      // Create placeholder for bot message
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          content: '',
          isLoading: true,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        }
      ])

      // Stream response from GPT
      const stream = await sendMessageToGPT(userText, fileData, currentModel)
      let fullResponse = ''

      // Stream the response
      for await (const chunk of stream) {
        fullResponse += chunk
        setMessages(prev => [
          ...prev.slice(0, -1),
          {
            type: 'bot',
            content: fullResponse,
            isLoading: true,
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
          }
        ])
      }

      // Parse response for additional data
      const shouldShowChart = fullResponse.toLowerCase().includes('chart') ||
        fullResponse.toLowerCase().includes('price') ||
        userText.toLowerCase().includes('chart') ||
        userText.toLowerCase().includes('plot')

      const response = {
        text: fullResponse,
        showChart: shouldShowChart,
        symbol: extractSymbolFromMessage(userText),
        chartData: shouldShowChart ? generateMockChartData(extractSymbolFromMessage(userText)) : null,
        snapshot: shouldShowChart ? generateMockSnapshot(extractSymbolFromMessage(userText)) : null,
        sentiment: shouldShowChart ? generateMockSentiment(extractSymbolFromMessage(userText)) : null,
        events: shouldShowChart ? [
          { date: '30-Oct-2025', name: 'Anchor book (IPO)', type: 'Corporate Action', impact: 'Anchor participation often sets initial institutional positioning and sentiment.' },
          { date: '01-Dec-2025', name: 'Q2 results reaction (newsflow)', type: 'Results / business update', impact: 'First earnings post listing often resets valuation narrative.' },
          { date: '04-Feb-2026', name: 'Anchor lock-in expiry (balance; ~90 days)', type: 'Block deal / Insider', impact: 'Second potential supply event; watch for volume spikes.' },
          { date: '11-Feb-2026', name: 'Q3 results reported (newsflow)', type: 'Results / business update', impact: 'Earnings catalyst; typically impacts trend and near-term momentum.' },
          { date: '20-Feb-2026', name: 'Analyst initiation (newsflow)', type: 'Corporate Action', impact: 'Coverage initiation can move the stock via target/stance and flows.' }
        ] : null,
        relatedQuestions: generateRelatedQuestions(userText),
        sources: generateCompanySources(userText)
      }

      // Final response
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          type: 'bot',
          content: response,
          isLoading: false,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        }
      ])

      setIsLoading(false)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)

      // Remove loading indicator
      setMessages(prev => prev.slice(0, -1))
    }
  }

  const handleRetry = () => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages].reverse().find(m => m.type === 'user')
      if (lastUserMessage) {
        setMessages(prev => prev.slice(0, -1))
        handleSendMessage(lastUserMessage.content)
      }
    }
  }

  const extractSymbolFromMessage = (text) => {
    const upperText = text.toUpperCase()

    // Map of variations to official symbols
    const symbolMap = {
      'LENSKART': ['LENSKART'],
      'DMART': ['DMART', 'DMart', 'D-MART', 'DMART'],
      'TCS': ['TCS', 'TATA CONSULTANCY'],
      'INFY': ['INFY', 'INFOSYS'],
      'WIPRO': ['WIPRO'],
      'RELIANCE': ['RELIANCE', 'RIL'],
      'HDFC': ['HDFC', 'HDFC BANK'],
      'JIOFINANCE': ['JIOFINANCE', 'JIO FINANCIAL', 'JF']
    }

    // Search for each symbol's variations
    for (const [symbol, variations] of Object.entries(symbolMap)) {
      for (const variation of variations) {
        if (upperText.includes(variation)) {
          return symbol
        }
      }
    }

    return 'SENSEX'
  }

  const generateRelatedQuestions = (userText) => {
    const symbol = extractSymbolFromMessage(userText)
    const generalQuestions = [
      {
        question: 'What are the key metrics for this stock?',
        answer: `Key metrics for ${symbol} include the Price-to-Earnings (P/E) ratio, Market Cap, Dividend Yield, and Return on Equity (ROE). The P/E ratio helps determine if the stock is overvalued or undervalued. Market Cap indicates the company's size and stability. Dividend Yield shows the annual dividend payment relative to stock price.`
      },
      {
        question: 'How does this compare to competitors?',
        answer: `${symbol} demonstrates strong competitive positioning with comparable or superior metrics to its peers. Revenue growth rates, profit margins, and market share are key indicators. Compare the P/E ratio, ROE, and debt-to-equity ratios with competitors to assess relative valuation and financial health.`
      },
      {
        question: 'What are the analyst ratings?',
        answer: `Most major analysts have positive outlooks on ${symbol} with ratings ranging from "Hold" to "Strong Buy". The average price target suggests upside potential. Analyst recommendations are based on financial forecasts, competitive positioning, and market trends. Always review multiple analyst opinions for balanced perspective.`
      },
      {
        question: 'What is the dividend yield?',
        answer: `${symbol} offers an attractive dividend yield, typically ranging between 2-4% annually depending on market conditions. The company has a consistent track record of dividend payments and regular increases. Dividend yield is calculated as annual dividend per share divided by current stock price.`
      },
      {
        question: 'What are the risks to watch for?',
        answer: `Key risks for ${symbol} include market volatility, sector headwinds, regulatory changes, and macroeconomic factors. Company-specific risks involve disruption from new technology, competitive pressures, and execution risks. Diversification and regular portfolio review can help mitigate these risks effectively.`
      }
    ]
    return generalQuestions.slice(0, 5)
  }

  const generateCompanySources = (userText) => {
    const symbol = extractSymbolFromMessage(userText);

    // Map symbols to full company names for better search queries
    const companyNames = {
      'LENSKART': 'Lenskart',
      'DMART': 'Avenue Supermarts (DMart)',
      'TCS': 'Tata Consultancy Services',
      'INFY': 'Infosys',
      'WIPRO': 'Wipro',
      'RELIANCE': 'Reliance Industries',
      'HDFC': 'HDFC Bank',
      'JIOFINANCE': 'Jio Financial Services'
    };

    if (symbol === 'SENSEX') {
      return [
        { title: 'BSE SENSEX Overview', url: 'https://www.google.com/finance/quote/SENSEX:INDEXBOM' },
        { title: 'Market Sentiment & News', url: 'https://www.google.com/search?q=BSE+SENSEX+stock+market+news' },
        { title: 'SENSEX Historical Data', url: 'https://www.google.com/search?q=BSE+SENSEX+historical+data' },
        { title: 'Top Gainers & Losers', url: 'https://www.google.com/search?q=BSE+SENSEX+top+gainers+and+losers+today' },
        { title: 'Economic Indicators', url: 'https://www.google.com/search?q=Indian+economy+indicators+impact+on+SENSEX' }
      ];
    }

    const companyName = companyNames[symbol] || symbol;

    // Use dynamic search queries that practically never 404
    return [
      { title: `${companyName} Stock Overview`, url: `https://www.google.com/finance?q=${encodeURIComponent(companyName)}` },
      { title: `Latest News on ${companyName}`, url: `https://www.google.com/search?q=${encodeURIComponent(companyName + ' stock market news')}&tbm=nws` },
      { title: 'Investor Relations & Filings', url: `https://www.google.com/search?q=${encodeURIComponent(companyName + ' investor relations annual reports')}` },
      { title: 'Quarterly Results Analysis', url: `https://www.google.com/search?q=${encodeURIComponent(companyName + ' latest quarterly results analysis')}` },
      { title: 'Management Transcripts', url: `https://www.google.com/search?q=${encodeURIComponent(companyName + ' earnings call transcript')}` }
    ];
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#111] rounded-2xl overflow-hidden border border-white/10">
      {/* Header */}
      <div className="bg-dark-gray border-b border-dark-gray p-4 flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold">Stocko Chat</h2>
          <p className="text-xs text-gray-400">Your AI Stock Market Assistant</p>
        </div>
        <button
          onClick={onChatHistoryOpen}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dark-gray hover:border-neon-green text-gray-300 hover:text-neon-green transition-all duration-300 text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          History
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="mb-8">
              <svg className="w-16 h-16 text-neon-green/50 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">Start a conversation to get stock insights</p>
          </div>
        ) : (
          messages.map((message, index) =>
            message.type === 'user' ? (
              <ChatMessage
                key={index}
                type="user"
                content={message.content}
                timestamp={message.timestamp}
              />
            ) : (
              <div key={index}>
                {message.isLoading && typeof message.content === 'string' && message.content.length > 0 && (
                  <div className="flex items-start gap-3 mb-4">
                    <svg className="w-4 h-4 text-neon-green flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-4a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                    </svg>
                    <div className="bg-dark-gray border border-neon-green/30 rounded-lg p-4 flex-1">
                      <div className="text-gray-100 text-sm prose prose-invert max-w-none whitespace-pre-wrap">
                        {message.content}
                      </div>
                      <TypingIndicator />
                    </div>
                  </div>
                )}
                {!message.isLoading && (
                  <BotResponse
                    response={message.content}
                    isLoading={false}
                    onRetry={handleRetry}
                  />
                )}
              </div>
            )
          )
        )}
        {error && (
          <BotResponse
            error={error}
            onRetry={handleRetry}
            response={null}
            isLoading={false}
          />
        )}
        {isLoading && messages[messages.length - 1]?.type === 'user' && (
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-neon-green animate-pulse"></div>
            <p className="text-gray-400 text-sm">Stocko is analyzing...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <ChatInputBar
        onSendMessage={handleSendMessage}
        onNewChat={() => setMessages([])}
        isLoading={isLoading}
      />

      {/* Scroll to bottom button */}
      {messages.length > 0 && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-24 right-6 p-3 rounded-full bg-neon-green/20 border border-neon-green text-neon-green hover:bg-neon-green/30 transition-all"
          title="Scroll to bottom"
        >
          <ArrowUp size={18} className="transform rotate-180" />
        </button>
      )}
    </div>
  )
}

export default ChatPage
