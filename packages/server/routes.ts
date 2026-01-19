import { Router, type Request, type Response } from 'express';
import { chatController } from './controllers/chat';

export const router = Router();

router.get('/hello', (req: Request, res: Response) => {
   res.status(200).json({ message: 'Hello from the server!' });
});

router.post('/chat', async (req: Request, res: Response) => {
   chatController.sendMessage(req, res);
});

export default router;
