import { conversationsRepository } from '../repositories/conversations';
import OpenAI from 'openai';
import type { ChatResponse } from '../types/chat';

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
   const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
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
