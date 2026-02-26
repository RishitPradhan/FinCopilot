'use client';

import React from 'react';
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

const data = [
    { name: 'Jan', value: 21500 },
    { name: 'Feb', value: 22100 },
    { name: 'Mar', value: 21800 },
    { name: 'Apr', value: 22400 },
    { name: 'May', value: 22900 },
    { name: 'Jun', value: 23200 },
    { name: 'Jul', value: 24100 },
    { name: 'Aug', value: 24500 },
    { name: 'Sep', value: 25100 },
    { name: 'Oct', value: 24800 },
    { name: 'Nov', value: 25400 },
    { name: 'Dec', value: 26000 },
];

export function MarketChart() {
    return (
        <div className="h-full w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="name"
                        stroke="#444"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#444"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                        domain={['dataMin - 1000', 'dataMax + 1000']}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#000',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            color: '#fff',
                            backdropFilter: 'blur(10px)'
                        }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#10b981"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
