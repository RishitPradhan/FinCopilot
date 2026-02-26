import React from 'react'

export const SentimentGauge = ({ sentiment = 'neutral', bearishCount = 2, neutralCount = 5, bullishCount = 8 }) => {
  const sentimentMap = {
    bearish: { color: '#ff4444', angle: -150, label: 'Bearish' },
    neutral: { color: '#ffaa00', angle: 0, label: 'Neutral' },
    bullish: { color: '#00ff88', angle: 150, label: 'Bullish' }
  }

  const current = sentimentMap[sentiment] || sentimentMap.neutral
  const totalCount = bearishCount + neutralCount + bullishCount

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-semibold text-white">Market Sentiment</h3>
      
      <div className="relative w-40 h-20">
        {/* Semicircle background */}
        <svg className="w-full h-full" viewBox="0 0 200 100">
          {/* Bearish arc (red) */}
          <path
            d="M 20 100 A 80 80 0 0 1 86 20"
            fill="none"
            stroke="#ff4444"
            strokeWidth="8"
            opacity="0.3"
          />
          {/* Neutral arc (orange) */}
          <path
            d="M 86 20 A 80 80 0 0 1 114 20"
            fill="none"
            stroke="#ffaa00"
            strokeWidth="8"
            opacity="0.3"
          />
          {/* Bullish arc (green) */}
          <path
            d="M 114 20 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#00ff88"
            strokeWidth="8"
            opacity="0.3"
          />

          {/* Needle */}
          <g transform={`translate(100, 100) rotate(${current.angle})`}>
            <line x1="0" y1="0" x2="0" y2="-70" stroke={current.color} strokeWidth="3" />
            <circle cx="0" cy="0" r="4" fill={current.color} />
          </g>
        </svg>

        {/* Current sentiment label */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-sm font-semibold" style={{ color: current.color }}>
            {current.label}
          </p>
        </div>
      </div>

      {/* Sentiment counts */}
      <div className="flex gap-6 text-xs justify-center w-full">
        <div className="text-center">
          <p className="text-red-500 font-semibold">{bearishCount}</p>
          <p className="text-gray-400">Bearish</p>
        </div>
        <div className="text-center">
          <p className="text-orange-500 font-semibold">{neutralCount}</p>
          <p className="text-gray-400">Neutral</p>
        </div>
        <div className="text-center">
          <p className="text-neon-green font-semibold">{bullishCount}</p>
          <p className="text-gray-400">Bullish</p>
        </div>
      </div>
    </div>
  )
}

export default SentimentGauge
