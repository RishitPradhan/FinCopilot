'use client';
import React, { useState } from 'react'
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  ReferenceDot
} from 'recharts'

export const StockChart = ({ stockSymbol = 'BAJFINANCE', data }) => {
  const [activeView, setActiveView] = useState('price')

  // Get company name for display
  const symbolToName = {
    'LENSKART': 'LENSKART',
    'DMART': 'DMART',
    'TCS': 'TCS',
    'INFY': 'INFOSYS',
    'WIPRO': 'WIPRO',
    'RELIANCE': 'RELIANCE',
    'HDFC': 'HDFCBANK',
    'JIOFINANCE': 'JIOFIN',
    'BAJFINANCE': 'BAJFINANCE'
  }
  const companyName = symbolToName[stockSymbol] || stockSymbol

  // Data generator if none provided
  const generateData = () => {
    let base = 7000;
    const res = [];
    const months = ['Feb \'25', 'Mar \'25', 'Apr \'25', 'May \'25', 'Jun \'25', 'Jul \'25', 'Aug \'25', 'Sep \'25', 'Oct \'25', 'Nov \'25', 'Dec \'25', 'Jan \'26', 'Feb \'26'];
    for (let i = 0; i < 100; i++) {
      base = base + (Math.random() - 0.48) * 300;
      let eventType = null;
      let eventColor = null;

      // Randomly assign some events for the visual
      if (i === 15) { eventType = 'E'; eventColor = '#ef4444'; } // Red E
      if (i === 28) { eventType = 'D'; eventColor = '#3b82f6'; } // Blue D
      if (i === 35) { eventType = 'S'; eventColor = '#f59e0b'; } // Yellow S
      if (i === 42) { eventType = 'B'; eventColor = '#8b5cf6'; } // Purple B
      if (i === 55) { eventType = 'E'; eventColor = '#10b981'; } // Green E
      if (i === 80) { eventType = 'E'; eventColor = '#10b981'; } // Green E
      if (i === 95) { eventType = 'E'; eventColor = '#ef4444'; } // Red E

      res.push({
        time: months[Math.floor(i / (100 / months.length))],
        price: base,
        volume: Math.random() * 1000 + 200,
        event: eventType,
        color: eventColor,
        isLightning: Math.random() > 0.9 // Random lightning bolts
      });
    }
    return res;
  }

  const chartData = data && data.length > 20 ? data : generateData()

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-[#1e1e1e] border border-gray-700 rounded-lg p-3 text-xs shadow-xl">
          <p className="text-gray-300 font-medium mb-1">{data.time}</p>
          <p className="text-white font-bold">₹{Math.round(data.price).toLocaleString()}</p>
          {data.event && (
            <div className="mt-2 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white font-bold" style={{ backgroundColor: data.color }}>
                {data.event}
              </span>
              <span className="text-gray-400">Key Event</span>
            </div>
          )}
        </div>
      )
    }
    return null
  }

  // Custom shape for events
  const renderCustomEvent = (props) => {
    const { cx, cy, payload } = props;
    if (!payload || (!payload.event && !payload.isLightning)) return null;

    return (
      <g>
        {payload.event && (
          <g transform={`translate(${cx}, ${cy})`}>
            <circle r={10} fill={payload.color} stroke="#1e1e1e" strokeWidth={2} />
            <text x={0} y={4} textAnchor="middle" fill="white" fontSize="10px" fontWeight="bold">
              {payload.event}
            </text>
          </g>
        )}
        {payload.isLightning && !payload.event && (
          <g transform={`translate(${cx}, ${cy - 15})`}>
            <path d="M-3,5 L2,-5 L1,-1 L4,0 L-2,8 L-1,3 Z" fill="#f97316" />
          </g>
        )}
      </g>
    )
  }

  return (
    <div className="w-full bg-[#1e1e1e] rounded-xl border border-gray-800 overflow-hidden shadow-lg mt-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold">
            B
          </div>
          <h3 className="text-lg font-bold text-white tracking-wide">{companyName}</h3>
        </div>

        <div className="flex bg-transparent border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveView('price')}
            className={`px-6 py-2 text-sm font-medium transition-colors ${activeView === 'price' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Price
          </button>
          <div className="w-px bg-gray-700"></div>
          <button
            onClick={() => setActiveView('pe')}
            className={`px-6 py-2 text-sm font-medium transition-colors ${activeView === 'pe' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            PE Ratio
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="p-4" style={{ height: '350px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="time"
              stroke="#555"
              tick={{ fill: '#888', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#555', strokeWidth: 1, strokeDasharray: '4 4' }}
            />

            {/* Volume Bars */}
            <Bar
              dataKey="volume"
              fill="#333"
              radius={[2, 2, 0, 0]}
              yAxisId="volume"
              barSize={4}
            />
            <YAxis yAxisId="volume" hide domain={[0, 'dataMax * 3']} />

            {/* Price Area */}
            <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
            <Area
              type="linear"
              dataKey="price"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#colorPrice)"
              activeDot={{ r: 6, fill: '#22c55e', stroke: '#fff', strokeWidth: 2 }}
            />

            {/* Event Dots */}
            {chartData.map((entry, index) => (
              (entry.event || entry.isLightning) && (
                <ReferenceDot
                  key={index}
                  x={entry.time}
                  y={entry.price}
                  r={0}
                  shape={(props) => renderCustomEvent({ ...props, payload: entry })}
                />
              )
            ))}

          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default StockChart

