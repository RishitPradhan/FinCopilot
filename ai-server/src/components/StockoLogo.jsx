import React from 'react'

export const StockoLogo = ({ size = 'lg' }) => {
  const sizeMap = {
    sm: { svg: 60, text: 'text-lg' },
    md: { svg: 80, text: 'text-2xl' },
    lg: { svg: 120, text: 'text-4xl' }
  }

  const currentSize = sizeMap[size]

  return (
    <div className="flex items-center gap-4">
      <svg
        width={currentSize.svg}
        height={currentSize.svg}
        viewBox="0 0 120 120"
        className="glow-green"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Hexagon Border */}
        <path
          d="M 60 10 L 100 35 L 100 85 L 60 110 L 20 85 L 20 35 Z"
          fill="none"
          stroke="#00ff88"
          strokeWidth="2"
          opacity="0.8"
        />

        {/* Stock Chart Line */}
        <polyline
          points="35,80 45,75 55,68 65,72 75,55 85,60 95,40"
          fill="none"
          stroke="#00ff88"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />

        {/* Key Events (Orange Lightning Bolts) */}
        <g fill="#ff6b00" opacity="0.9">
          {/* First bolt at 45,75 */}
          <polygon points="45,60 42,75 48,75 40,90 50,75"/>
          
          {/* Second bolt at 75,55 */}
          <polygon points="75,40 72,55 78,55 70,70 80,55"/>
        </g>

        {/* Center Circle for depth */}
        <circle cx="60" cy="60" r="20" fill="none" stroke="#7c3aed" strokeWidth="1" opacity="0.5"/>
      </svg>

      <div>
        <h1 className={`font-bold tracking-tight text-neon-green glow-green ${currentSize.text}`}>
          Stocko
        </h1>
        {size === 'lg' && (
          <p className="text-sm text-gray-400 mt-1">Ask Anything. Ask Stocko.</p>
        )}
      </div>
    </div>
  )
}

export default StockoLogo
