import React, { useState, useEffect } from 'react'
import HomePage from './components/HomePage'
import ChatPage from './components/ChatPage'
import ChatHistory from './components/ChatHistory'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

function App() {
  const [currentView, setCurrentView] = useState('home') // 'home' or 'chat'
  const [showChatHistory, setShowChatHistory] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const [initialMessage, setInitialMessage] = useState(null)

  // Load chat history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('stocko_chat_history')
      if (saved) {
        setChatHistory(JSON.parse(saved))
      }
    } catch (error) {
      console.warn('Failed to load chat history:', error)
      // Clear corrupted data
      localStorage.removeItem('stocko_chat_history')
    }
  }, [])

  const handleSuggestionClick = (suggestion) => {
    setInitialMessage(suggestion)
    setCurrentView('chat')
    
    // Add to chat history
    const newConversation = {
      timestamp: new Date().toLocaleString(),
      firstMessage: suggestion,
      messageCount: 1
    }
    
    const updated = [newConversation, ...chatHistory]
    setChatHistory(updated)
    
    try {
      localStorage.setItem('stocko_chat_history', JSON.stringify(updated))
    } catch (error) {
      console.warn('Failed to save chat history:', error)
    }
  }

  const handleNewChat = () => {
    setCurrentView('home')
    setInitialMessage(null)
    setShowChatHistory(false)
  }

  return (
    <ErrorBoundary>
      <div className="w-full h-screen bg-dark-bg overflow-hidden">
        {currentView === 'home' && (
          <HomePage
            onSuggestionClick={handleSuggestionClick}
            onChatHistoryClick={() => setShowChatHistory(true)}
          />
        )}

        {currentView === 'chat' && (
          <ChatPage
            onChatHistoryOpen={() => setShowChatHistory(true)}
            onNewChat={handleNewChat}
            initialMessage={initialMessage}
          />
        )}

        <ChatHistory
          isOpen={showChatHistory}
          onClose={() => setShowChatHistory(false)}
          conversations={chatHistory}
        />
      </div>
    </ErrorBoundary>
  )
}

export default App
