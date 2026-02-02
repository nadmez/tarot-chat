import ReactMarkdown from 'react-markdown';

import type { Message } from '@/types';
import { useEffect, useRef } from 'react';

type ChatMessagesProps = {
   messages: Message[];
};

const onCopyMessage = (e: React.ClipboardEvent) => {
   const selection = window.getSelection()?.toString().trim();
   if (selection) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', selection);
   }
};

const ChatMessages = ({ messages = [] }: ChatMessagesProps) => {
   const messageContainerRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const el = messageContainerRef.current;
      if (!el) return;
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
   }, [messages]);

   return (
      <div
         ref={messageContainerRef}
         className="message-container flex flex-col flex-1 gap-2 max-h-[75vh] overflow-y-auto p-4 border-2 rounded-3xl"
      >
         {messages.map((msg, index) => (
            <div
               key={index}
               onCopy={onCopyMessage}
               className={`px-3 py-1 rounded-xl ${
                  msg.role === 'user'
                     ? 'self-end bg-blue-400 text-white'
                     : 'self-start bg-gray-200 text-black'
               }`}
            >
               <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
         ))}
      </div>
   );
};

export default ChatMessages;
