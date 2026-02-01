import axios from 'axios';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';

import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa';
import { useRef, useState } from 'react';

type FormData = {
   prompt: string;
};

type ChatResponse = {
   message: string;
};

type Message = {
   content: string;
   role: 'user' | 'bot';
};

const ChatBot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const conversationId = useRef<string | undefined>(undefined);

   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const onSubmitHandler = async ({ prompt }: FormData) => {
      setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
      reset();

      if (!conversationId.current) conversationId.current = crypto.randomUUID();

      const { data } = await axios.post<ChatResponse>('/api/chat', {
         prompt,
         conversationId: conversationId?.current,
      });

      setMessages((prev) => [...prev, { content: data.message, role: 'bot' }]);
   };

   const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmitHandler)();
      }
   };

   return (
      <div className="chat-container flex flex-col gap-3">
         <div className="message-container flex flex-col gap-2 max-h-[70vh] overflow-y-auto p-4 border-2 rounded-3xl">
            {messages.map((msg, index) => (
               <p
                  key={index}
                  className={`px-3 py-1 rounded-xl ${
                     msg.role === 'user'
                        ? 'self-end bg-blue-400 text-white'
                        : 'self-start bg-gray-200 text-black'
                  }`}
               >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
               </p>
            ))}
         </div>
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
