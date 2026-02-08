import { conversationsRepository } from '../repositories/conversations';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import type { ChatResponse } from '../types/chat';
import template from '../prompts/chatbox.txt';

const { getLastConversationId, setLastConversationId } =
   conversationsRepository;

// implementation detail
const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
);

const instructions = template
   .replace('{park_info}', parkInfo)
   .replace('{today}', new Date().toDateString());

const sendMessage = async (
   prompt: string,
   conversationId: string
): Promise<ChatResponse> => {
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
