'use client';

import React, { useState, useRef } from 'react';
import { Send, Paperclip, Plus, X } from 'lucide-react';

interface ChatInputBarProps {
    onSendMessage: (msg: string, file: File | null) => void;
    onNewChat: () => void;
    isLoading: boolean;
}

export const ChatInputBar = ({ onSendMessage, onNewChat, isLoading }: ChatInputBarProps) => {
    const [message, setMessage] = useState('');
    const [model, setModel] = useState('gpt-4o');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ['image/png', 'image/jpeg', 'application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
            if (validTypes.includes(file.type)) {
                setUploadedFile(file);
            } else {
                alert('Please upload PNG, JPG, PDF, or PPTX files only');
            }
        }
    }

    const handleSend = () => {
        if ((message.trim() || uploadedFile) && !isLoading) {
            onSendMessage(message, uploadedFile);
            setMessage('');
            setUploadedFile(null);
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    return (
        <div className="bg-dark-bg border-t border-dark-gray p-4 space-y-3 shrink-0">
            {/* Uploaded file preview */}
            {uploadedFile && (
                <div className="flex items-center gap-3 px-4 py-3 bg-dark-gray rounded-lg border border-neon-green/30">
                    <Paperclip size={16} className="text-neon-green" />
                    <span className="text-sm text-gray-200 flex-1 truncate">{uploadedFile.name}</span>
                    <button
                        onClick={() => setUploadedFile(null)}
                        className="p-1 hover:bg-dark-bg rounded transition-colors text-gray-400 hover:text-red-400"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {/* Input and controls */}
            <div className="flex gap-3">
                {/* Model selector */}
                <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="px-3 py-3 rounded-lg bg-dark-gray border border-dark-gray hover:border-purple-accent text-gray-200 text-sm focus:outline-none focus:border-neon-green transition-colors"
                >
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </select>

                {/* New Chat button */}
                <button
                    onClick={onNewChat}
                    className="px-4 py-3 rounded-lg bg-dark-gray border border-dark-gray hover:border-purple-accent text-gray-300 hover:text-purple-accent text-sm font-medium transition-colors flex items-center gap-2"
                >
                    <Plus size={16} />
                    New
                </button>

                {/* Main input area */}
                <div className="flex-1 relative">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask any question to Stocko..."
                        rows={1}
                        className="w-full px-4 py-3 rounded-lg bg-dark-gray border border-dark-gray hover:border-purple-accent focus:border-neon-green text-white placeholder-gray-500 focus:outline-none transition-colors resize-none"
                        style={{ maxHeight: '120px' }}
                    />

                    {/* Paperclip and Send buttons */}
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2 bg-dark-gray rounded-lg px-2 py-1 shadow-[-10px_0_15px_#1a1a1a]">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 text-gray-400 hover:text-neon-green transition-colors hover:bg-dark-bg rounded"
                            title="Attach file"
                        >
                            <Paperclip size={18} />
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={isLoading || (!message.trim() && !uploadedFile)}
                            className={`p-2 rounded transition-colors ${isLoading || (!message.trim() && !uploadedFile)
                                    ? 'text-gray-600 cursor-not-allowed'
                                    : 'text-purple-accent hover:text-neon-green hover:bg-dark-bg'
                                }`}
                        >
                            <Send size={18} />
                        </button>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleUpload}
                        accept=".png,.jpg,.jpeg,.pdf,.pptx"
                        className="hidden"
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between text-xs text-gray-500 px-2 mt-2">
                <p>Press Shift+Enter for new line</p>
                <div className="text-purple-accent hover:text-neon-green transition-colors font-medium">
                    Stocko Guide
                </div>
            </div>
        </div>
    )
}

export default ChatInputBar;
