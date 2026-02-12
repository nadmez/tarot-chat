import { cardService } from '../services/cardService';
import type { Request, Response } from 'express';
import { i18n } from '../utils/i18n';

const getRandomCards = async (req: Request, res: Response) => {
   try {
      const { n: queryN } = req.query;

      // n değerini sayıya çevir
      const n = parseInt(queryN as string, 10);

      // Eğer n sayı değilse, 0 veya daha küçükse ya da 78'den büyükse boş dizi dön
      if (isNaN(n) || n <= 0 || n > 78) {
         return res.json([]);
      }

      const cards = cardService.getRandomCards(n);
      res.json(cards);
   } catch (error) {
      console.error('Random cards error:', error);
      res.status(500).json({ error: i18n.t('server.errors.failedResponse') });
   }
};

export const cardController = {
   getRandomCards,
};
