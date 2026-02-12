import {
   Router,
   type Request,
   type Response,
   type NextFunction,
} from 'express';
import { chatController } from './controllers/chat';
import { cardController } from './controllers/card';
import { i18n, setLanguageFromRequest } from './utils/i18n';

export const router = Router();

// Dili her request'te ayarla
router.use((req: Request, res: Response, next: NextFunction) => {
   setLanguageFromRequest(req.headers as Record<string, string | string[]>);
   next();
});

router.get('/hello', (req: Request, res: Response) => {
   res.status(200).json({ message: i18n.t('server.helloMessage') });
});

router.get('/cards/random', (req: Request, res: Response) => {
   cardController.getRandomCards(req, res);
});

router.post('/chat', async (req: Request, res: Response) => {
   chatController.sendMessage(req, res);
});

export default router;
