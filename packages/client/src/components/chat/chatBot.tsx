import axios from 'axios';

import BotTypingSpinner from '@/components/chat/botTypingSpinner';
import { useRef, useState } from 'react';
import ChatMessages from '@/components/chat/chatMessages';
import ChatInput from '@/components/chat/chatInput';

import type { Message, ChatFormData, ChatResponse } from '@/types';

const ChatBot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const conversationId = useRef<string | undefined>(undefined);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const onSubmitHandler = async ({ prompt }: ChatFormData) => {
      try {
         setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
         setIsBotTyping(true);
         setError(null);

         if (!conversationId.current)
            conversationId.current = crypto.randomUUID();

         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId?.current,
         });

         setMessages((prev) => [
            ...prev,
            { content: data.message, role: 'bot' },
         ]);
      } catch (error) {
         console.error(error);
         setError('Something went wrong! Please try again later.');
      } finally {
         setIsBotTyping(false);
      }
   };

   return (
      <div className="chat-container flex flex-col gap-3 h-screen">
         <ChatMessages messages={messages} />
         {isBotTyping && <BotTypingSpinner />}
         {error && <div className="text-red-500">{error}</div>}
         <ChatInput onSubmit={onSubmitHandler} isLoading={isBotTyping} />
      </div>
   );
};

export default ChatBot;
