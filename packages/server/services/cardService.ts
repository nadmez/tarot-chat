import { cardRepository } from '../repositories/cardRepository';
import type { TarotCard } from '../types/card';

const getRandomCards = (n: number): TarotCard[] => {
   const allCards = cardRepository.getAllCards();

   // Sınırlandırma: Kart sayısından fazla istenirse hepsini döndür
   const count = Math.min(n, allCards.length);

   const shuffled = [...allCards].sort(() => 0.5 - Math.random());
   return shuffled.slice(0, count);
};

export const cardService = {
   getRandomCards,
};
