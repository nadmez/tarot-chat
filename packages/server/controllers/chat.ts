import { chatService } from '../services/chatService';
import type { Request, Response } from 'express';
import { z } from 'zod';
import { i18n } from '../utils/i18n';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, i18n.t('server.errors.emptyPrompt'))
      .max(1000, i18n.t('server.errors.promptTooLong')),
   conversationId: z.string().uuid(),
});

const sendMessage = async (req: Request, res: Response) => {
   try {
      const parsedResult = chatSchema.safeParse(req.body);
      if (!parsedResult.success) {
         return res.status(400).json(z.treeifyError(parsedResult.error));
      }
      const { prompt, conversationId } = parsedResult.data;
      const response = await chatService.sendMessage(prompt, conversationId);
      res.json(response);
   } catch (error) {
      res.status(500).json({ error: i18n.t('server.errors.failedResponse') });
   }
};

export const chatController = {
   sendMessage,
};
