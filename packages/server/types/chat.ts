import type { TarotCard } from './card';

export type ChatResponse = {
   message: string;
   id: string;
   cards: TarotCard[];
};
