import React from 'react'

export const TypingIndicator = () => {
    return (
        <div className="flex items-center gap-1 px-4 py-2">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
    )
}

export default TypingIndicator
