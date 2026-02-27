'use client';
import React from 'react'

export const SentimentGauge = ({ sentiment = 'neutral', bearishCount = 2, neutralCount = 5, bullishCount = 8 }) => {
  const sentimentMap = {
    bearish: { color: '#60a5fa', angle: 45, label: 'Bearish' }, // Blue
    neutral: { color: '#3b82f6', angle: 90, label: 'Neutral' }, // Solid blue
    bullish: { color: '#2563eb', angle: 135, label: 'Bullish' }  // Dark blue
  }

  const current = sentimentMap[sentiment] || sentimentMap.neutral
  const totalCount = bearishCount + neutralCount + bullishCount

  return (
    <div className="flex flex-col md:flex-row items-center gap-12 py-4">

      {/* Gauge Container */}
      <div className="relative w-64 h-32 flex flex-col items-center">
        {/* Semi-Circle Track (Dark) */}
        <div className="absolute top-0 w-64 h-32 overflow-hidden">
          <div className="w-64 h-64 border-[12px] border-[#222] rounded-full"></div>
        </div>

        {/* Semi-Circle Progress (Blue gradient) */}
        <div className="absolute top-0 w-64 h-32 overflow-hidden">
          <div
            className="w-64 h-64 border-[12px] rounded-full border-t-transparent border-r-transparent border-b-blue-500 border-l-[#4488ff]"
            style={{ transform: 'rotate(45deg)' }}
          ></div>
        </div>

        {/* Needle */}
        <div
          className="absolute bottom-0 w-full h-[2px] flex justify-center origin-bottom transition-transform duration-1000 ease-out"
          style={{ transform: `rotate(${current.angle}deg)` }}
        >
          <div className="relative bottom-0 left-1/2 w-28 h-[2px] bg-white -translate-x-full"></div>
          {/* Needle Base Pin */}
          <div className="absolute left-1/2 -bottom-[3px] w-2 h-2 bg-white rounded-full -translate-x-1/2"></div>
        </div>

        {/* Labels positioned around the arc */}
        <div className="absolute bottom-2 -left-6 text-sm text-gray-400">Bearish</div>
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm text-gray-400">Neutral</div>
        <div className="absolute bottom-2 -right-6 text-sm text-gray-400">Bullish</div>
      </div>

      {/* Sentiment Counts (Right side) */}
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-xl font-bold text-white mb-2">Bullish</h3>
        <div className="flex gap-8 text-center">
          <div>
            <p className="text-gray-400 text-sm mb-2 font-medium">Bearish</p>
            <p className="text-white text-xl font-bold">{bearishCount}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-2 font-medium">Neutral</p>
            <p className="text-white text-xl font-bold">{neutralCount}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-2 font-medium">Bullish</p>
            <p className="text-white text-xl font-bold">{bullishCount}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SentimentGauge
