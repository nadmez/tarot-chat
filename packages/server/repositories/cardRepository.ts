import fs from 'fs';
import path from 'path';

import type { TarotCard } from '../types/card';

const cardsPath = path.join(__dirname, '..', 'prompts', 'tarot-cards.json');

const getAllCards = (): TarotCard[] => {
   const data = fs.readFileSync(cardsPath, 'utf-8');
   return JSON.parse(data);
};

export const cardRepository = {
   getAllCards,
};
