'use client';
import React from 'react'
import { MessageCircle, User } from 'lucide-react'

export const ChatMessage = ({ type = 'user', content, timestamp }) => {
  if (type === 'user') {
    return (
      <div className="flex justify-end mb-6 animate-fade-in">
        <div className="max-w-xl">
          <div className="flex items-end gap-3">
            <div className="bg-white text-black border border-gray-200 rounded-3xl rounded-tr-none px-6 py-3 ml-auto">
              <p className="text-sm font-medium leading-relaxed">{content}</p>
            </div>
            <User size={18} className="text-white flex-shrink-0 mb-1" />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-right">{timestamp}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start mb-6 animate-fade-in">
      <div className="max-w-2xl w-full">
        <div className="flex items-end gap-3">
          <MessageCircle size={18} className="text-neon-green flex-shrink-0 mb-1" />
          <div className="bg-dark-gray border border-neon-green/30 rounded-3xl rounded-tl-none px-6 py-3 flex-1">
            <p className="text-gray-200 text-sm leading-relaxed">{content}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 ml-7">{timestamp}</p>
      </div>
    </div>
  )
}

export default ChatMessage
