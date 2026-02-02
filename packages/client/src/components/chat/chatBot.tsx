import axios from 'axios';
import { useForm } from 'react-hook-form';

import { Button } from '../ui/button';
import BotTypingSpinner from './botTypingSpinner';
import { FaArrowUp } from 'react-icons/fa';
import { useRef, useState } from 'react';
import ChatMessages from './chatMessages';

import type { Message, FormData, ChatResponse } from '@/types';

const ChatBot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const conversationId = useRef<string | undefined>(undefined);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const onSubmitHandler = async ({ prompt }: FormData) => {
      try {
         setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
         setIsBotTyping(true);
         reset({ prompt: '' });
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

   const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmitHandler)();
      }
   };

   return (
      <div className="chat-container flex flex-col gap-3 h-screen">
         <ChatMessages messages={messages} />
         {isBotTyping && <BotTypingSpinner />}
         {error && <div className="text-red-500">{error}</div>}

         <form
            className="prompt-form flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
               e.preventDefault();
               handleSubmit(onSubmitHandler)();
            }}
         >
            <textarea
               {...register('prompt', {
                  required: true,
                  validate: (value) => value.trim().length > 0,
               })}
               placeholder="Ask me anything..."
               className="w-full border-0 focus:outline-0 resize-none"
               maxLength={1000}
               onKeyDown={onKeyDown}
               autoFocus
            ></textarea>
            <Button
               disabled={!formState.isValid}
               className="rounded-full w-9 h-9"
            >
               <FaArrowUp />
            </Button>
         </form>
      </div>
   );
};

export default ChatBot;
