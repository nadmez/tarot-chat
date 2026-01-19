import { chatService } from '../services/chatService';
import type { Request, Response } from 'express';
import { z } from 'zod';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt cannot be empty')
      .max(1000, 'Prompt is too long (max 1000 characters)'),
   conversationId: z.uuid(),
});

const sendMessage = async (req: Request, res: Response) => {
   try {
      const parsedResult = chatSchema.safeParse(req.body);
      if (!parsedResult.success) {
         return res.status(400).json(z.treeifyError(parsedResult.error));
      }
      const { prompt, conversationId } = parsedResult.data;
      const response = await chatService.sendMessage(prompt, conversationId);
      // console.log('OpenAI Response:', JSON.stringify(response, null, 4));
      res.json({ response: response.message });
   } catch (error) {
      res.status(500).json({ error: 'Failed to generate a response' });
   }
};

export const chatController = {
   sendMessage,
};
