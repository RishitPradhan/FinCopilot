'use client';
import React from 'react'
import { X, Trash2 } from 'lucide-react'

export const ChatHistory = ({ isOpen, onClose, conversations = [] }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-all"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-screen w-96 bg-dark-gray border-l-2 border-dark-gray z-40 transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0 border-neon-green' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="border-b border-dark-gray p-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Chat History</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-bg rounded-lg transition-colors text-gray-400 hover:text-neon-green"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {conversations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No conversations yet</p>
              <p className="text-xs mt-2">Your chat history will appear here</p>
            </div>
          ) : (
            conversations.map((conv, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-dark-bg hover:bg-dark-gray hover:border border-neon-green/30 cursor-pointer transition-all group"
              >
                <p className="text-xs text-gray-400 mb-2">{conv.timestamp}</p>
                <p className="text-sm text-gray-200 line-clamp-2 group-hover:text-neon-green transition-colors">
                  {conv.firstMessage}
                </p>
                <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                  <span>{conv.messageCount} messages</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-400"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-dark-gray p-4">
          <button className="w-full py-2 rounded-lg bg-neon-green/10 border border-neon-green text-neon-green hover:bg-neon-green/20 transition-colors text-sm font-medium">
            Clear All
          </button>
        </div>
      </div>
    </>
  )
}

export default ChatHistory
