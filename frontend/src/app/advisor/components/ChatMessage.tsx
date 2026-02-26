import React from 'react';
import { MessageCircle, User } from 'lucide-react';

interface ChatMessageProps {
    type?: 'user' | 'bot';
    content: string | React.ReactNode;
    timestamp: string;
}

export const ChatMessage = ({ type = 'user', content, timestamp }: ChatMessageProps) => {
    if (type === 'user') {
        return (
            <div className="flex justify-end mb-6 animate-fade-in">
                <div className="max-w-xl">
                    <div className="flex items-end gap-3">
                        <div className="bg-purple-accent/20 border border-purple-accent rounded-3xl rounded-tr-none px-6 py-3 ml-auto">
                            {typeof content === 'string' ? (
                                <p className="text-white text-sm leading-relaxed">{content}</p>
                            ) : (
                                content
                            )}
                        </div>
                        <User size={18} className="text-purple-accent flex-shrink-0 mb-1" />
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
                        {typeof content === 'string' ? (
                            <p className="text-gray-100 text-sm leading-relaxed">{content}</p>
                        ) : (
                            content
                        )}
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-7">{timestamp}</p>
            </div>
        </div>
    )
}

export default ChatMessage;
