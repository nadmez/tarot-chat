import axios from 'axios';

import BotTypingSpinner from '@/components/chat/botTypingSpinner';
import { useRef, useState } from 'react';
import ChatMessages from '@/components/chat/chatMessages';
import ChatInput from '@/components/chat/chatInput';
import popSound from '@/assets/pop.mp3';
import notificationSound from '@/assets/notification.mp3';
import { HelpCircle } from 'lucide-react';

const popAudio = new Audio(popSound);
popAudio.volume = 0.2;

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.2;

import type { Message, ChatFormData, ChatResponse, TarotCard } from '@/types';

const ChatBot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const conversationId = useRef<string | undefined>(undefined);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [cards, setCards] = useState<TarotCard[]>([]);

   const onSubmitHandler = async ({ prompt }: ChatFormData) => {
      try {
         setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
         setIsBotTyping(true);
         setError(null);
         setCards([]); // Yeni soruda kartları sıfırla (yer tutucular geri döner)
         popAudio.play();

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
         setCards(data.cards || []);
         notificationAudio.play();
      } catch (error) {
         console.error(error);
         setError('Something went wrong! Please try again later.');
      } finally {
         setIsBotTyping(false);
      }
   };

   return (
      <div className="chat-container flex flex-col gap-3 h-full">
         {/* Tarot Cards Section - Top 40% of screen (Always Visible) */}
         <div className="flex justify-center items-center gap-6 p-4 h-[40vh] bg-amber-500/5 border-b border-amber-500/20 overflow-hidden relative">
            {(cards.length > 0 ? cards : [1, 2, 3]).map(
               (cardOrPlaceholder, index) => {
                  const isPlaceholder = typeof cardOrPlaceholder === 'number';
                  const card = !isPlaceholder
                     ? (cardOrPlaceholder as TarotCard)
                     : null;

                  return (
                     <div
                        key={
                           isPlaceholder
                              ? `placeholder-${index}`
                              : `${card?.name_short}-${index}`
                        }
                        className="card-item group perspective-1000 h-full flex items-center"
                        style={{ animationDelay: `${index * 150}ms` }}
                     >
                        <div
                           className={`relative transform-gpu transition-all duration-500 h-[80%] aspect-[2/3.5] ${!isPlaceholder ? 'hover:scale-110 hover:-translate-y-4' : ''}`}
                        >
                           {isPlaceholder ? (
                              /* Placeholder View */
                              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200/50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-400/30 shadow-inner">
                                 <HelpCircle className="w-12 h-12 text-gray-400/50 animate-pulse" />
                              </div>
                           ) : (
                              /* Actual Card View */
                              <>
                                 <img
                                    src={card?.image_url}
                                    alt={card?.name}
                                    className="w-full h-full object-cover rounded-xl shadow-[0_10px_30px_rgba(245,158,11,0.3)] border-2 border-amber-500/40 group-hover:border-amber-500/80 group-hover:shadow-[0_20px_40px_rgba(245,158,11,0.5)] fade-in-up"
                                 />
                                 <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 to-transparent rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-[10px] md:text-xs text-amber-200 text-center font-bold tracking-wider uppercase leading-tight whitespace-normal">
                                       {card?.name}
                                    </p>
                                 </div>
                              </>
                           )}
                        </div>
                     </div>
                  );
               }
            )}
         </div>

         {/* Chat Messages Section - Remaining height */}
         <div className="flex-1 overflow-hidden flex flex-col">
            <ChatMessages messages={messages} />
            {isBotTyping && <BotTypingSpinner />}
            {error && <div className="text-red-500 px-4">{error}</div>}
         </div>

         {/* Chat Input Section */}
         <ChatInput onSubmit={onSubmitHandler} isLoading={isBotTyping} />
      </div>
   );
};

export default ChatBot;
