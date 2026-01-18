import express, { type Request, type Response } from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import z from 'zod';

const app = express();
app.use(express.json());

dotenv.config();

const port = process.env.PORT || 3000;

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

app.get('/', (req: Request, res: Response) => {
   res.send('Hello from the server!');
});

const conversations = new Map<string, string>();

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt cannot be empty')
      .max(1000, 'Prompt is too long (max 1000 characters)'),
   conversationId: z.uuid(),
});

app.post('/api/chat', async (req: Request, res: Response) => {
   const parsedResult = chatSchema.safeParse(req.body);

   if (!parsedResult.success) {
      return res.status(400).json(z.treeifyError(parsedResult.error));
   }

   try {
      const { prompt, conversationId } = parsedResult.data;

      console.log(prompt);

      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         max_output_tokens: 256,
         temperature: 0.4,
         previous_response_id: conversations.get(conversationId),
      });

      console.log('conversations', conversations, ...conversations);

      conversations.set(conversationId, response.id);

      // console.log('OpenAI Response:', JSON.stringify(response, null, 4));
      res.json({ response: response.output_text });
   } catch (error) {
      res.status(500).json({ error: 'Failed to generate a response' });
   }
});

app.listen(port, () => {
   console.log(`Server listening at http://localhost:${port}`);
});
