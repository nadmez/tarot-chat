import { conversationsRepository } from '../repositories/conversations';
import OpenAI from 'openai';
import type { ChatResponse } from '../types/chat';
import template from '../prompts/tarot.txt';
import { cardService } from './cardService';

const { getLastConversationId, setLastConversationId } =
   conversationsRepository;

// implementation detail
const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const sendMessage = async (
   prompt: string,
   conversationId: string
): Promise<ChatResponse> => {
   // 3 rastgele kart çek ve JSON olarak formatla
   const cards = cardService.getRandomCards(3);
   const cardInfo = JSON.stringify(cards, null, 2);

   const instructions = template
      .replace('{{cardInfo}}', cardInfo)
      .replace('{{today}}', new Date().toDateString());

   const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
      instructions,
      max_output_tokens: 100_000,
      temperature: 0.8,
      previous_response_id: getLastConversationId(conversationId),
   });

   setLastConversationId(conversationId, response.id);

   return {
      message: response.output_text,
      id: response.id,
   };
};

// Public interface
export const chatService = {
   sendMessage,
};
