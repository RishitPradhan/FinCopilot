'use client';

import React from 'react';
import ChatPage from '@/components/ai-analyst/ChatPage';

export default function AdvisorPage() {
    return (
        <div className="h-[calc(100vh-140px)] w-full flex gap-8 animate-in fade-in duration-500">
            <ChatPage onChatHistoryOpen={() => { }} initialMessage="" />
        </div>
    );
}

