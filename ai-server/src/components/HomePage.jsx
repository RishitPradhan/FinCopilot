import React from 'react'
import { Send, ArrowRight } from 'lucide-react'
import StockoLogo from './StockoLogo'

const SuggestionCard = ({ text, onClick }) => {
  const [hovered, setHovered] = React.useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`p-6 rounded-lg border-2 transition-all duration-300 text-left group h-full flex flex-col justify-between ${
        hovered
          ? 'border-neon-green bg-dark-gray shadow-glow'
          : 'border-dark-gray bg-dark-gray/50 hover:border-purple-accent'
      }`}
    >
      <p className="text-white text-sm leading-relaxed font-medium">{text}</p>
      <div className={`flex justify-end transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-50'}`}>
        <ArrowRight size={18} className="text-neon-green group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  )
}

export const HomePage = ({ onSuggestionClick, onChatHistoryClick }) => {
  const suggestions = [
    "Identify red flags in my portfolio.",
    "Summarize Q3 PPT of DMART in 7 bullet points.",
    "Plot the price chart of LENSKART with key events marked.",
    "How is the lending biz of Jio Financial doing in Q3?"
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-bg px-4">
      {/* Header with Chat History Button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={onChatHistoryClick}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dark-gray hover:border-neon-green text-gray-300 hover:text-neon-green transition-all duration-300 text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Chat History
        </button>
      </div>

      {/* Logo and Tagline */}
      <div className="mb-16 text-center">
        <StockoLogo size="lg" />
      </div>

      {/* Suggestion Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-16">
        {suggestions.map((suggestion, index) => (
          <SuggestionCard
            key={index}
            text={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
          />
        ))}
      </div>

      {/* Chat Input at Bottom */}
      <div className="w-full max-w-3xl">
        <div className="relative group">
          <input
            type="text"
            placeholder="Ask any question to Stocko"
            className="w-full px-6 py-4 rounded-full bg-dark-gray border-2 border-dark-gray hover:border-purple-accent focus:border-neon-green text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                onSuggestionClick(e.target.value)
                e.target.value = ''
              }
            }}
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-accent hover:text-neon-green transition-colors">
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Bottom Link */}
      <div className="absolute bottom-6 right-6">
        <a href="#" className="text-sm text-purple-accent hover:text-neon-green transition-colors font-medium">
          Stocko Guide
        </a>
      </div>
    </div>
  )
}

export default HomePage
