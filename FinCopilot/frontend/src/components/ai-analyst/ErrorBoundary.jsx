'use client';
import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Log error for debugging
    console.error('Stocko Error Boundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-dark-gray border border-red-500/30 rounded-lg p-6 text-center">
            <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
            
            <h1 className="text-xl font-bold text-white mb-2">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-400 text-sm mb-6">
              Stocko encountered an unexpected error. This might be due to:
            </p>
            
            <ul className="text-left text-gray-400 text-xs mb-6 space-y-1">
              <li>• Missing or invalid OpenAI API key</li>
              <li>• Network connectivity issues</li>
              <li>• Browser compatibility problems</li>
              <li>• Temporary service disruption</li>
            </ul>
            
            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full px-4 py-2 bg-neon-green text-dark-bg rounded-lg font-medium hover:bg-neon-green/90 transition-colors"
              >
                Try Again
              </button>
              
              <button
                onClick={this.handleReload}
                className="w-full px-4 py-2 bg-dark-bg border border-gray-600 text-gray-300 rounded-lg font-medium hover:border-neon-green hover:text-neon-green transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} />
                Reload Page
              </button>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                If the problem persists, check the browser console (F12) for more details.
              </p>
            </div>
            
            {/* Show error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                  Show Error Details (Development)
                </summary>
                <div className="mt-2 p-3 bg-red-900/20 border border-red-700/30 rounded text-xs text-red-300 font-mono overflow-auto max-h-32">
                  <div className="mb-2 font-bold">Error:</div>
                  <div className="mb-2">{this.state.error.toString()}</div>
                  {this.state.errorInfo.componentStack && (
                    <>
                      <div className="mb-2 font-bold">Component Stack:</div>
                      <div className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</div>
                    </>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
