import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa';
import { useRef, useState } from 'react';

type FormData = {
   prompt: string;
};

type ChatResponse = {
   response: string;
};

const ChatBot = () => {
   const [messages, setMessages] = useState<string[]>([]);
   const conversationId = useRef<string | undefined>(undefined);
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const onSubmitHandler = async ({ prompt }: FormData) => {
      setMessages((prev) => [...prev, prompt]);
      reset();
      if (!conversationId.current) conversationId.current = crypto.randomUUID();
      const { data } = await axios.post<ChatResponse>('/api/chat', {
         prompt,
         conversationId: conversationId.current,
      });
      setMessages((prev) => [...prev, data.response]);
   };

   const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmitHandler)();
      }
   };

   return (
      <div className="flex flex-col gap-4">
         <div className="flex flex-col gap-2 max-h-96 overflow-y-auto p-4 border-2 rounded-3xl">
            {messages.map((msg, index) => (
               <div
                  key={index}
                  className={`p-2 rounded-lg ${
                     index % 2 === 0
                        ? 'bg-blue-100 self-end'
                        : 'bg-gray-200 self-start'
                  }`}
               >
                  {msg}
               </div>
            ))}
         </div>
         <form
            className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
            onSubmit={handleSubmit(onSubmitHandler)}
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
