import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { TarotCard } from '../types/card';

const cardsPath = path.join(
   path.dirname(fileURLToPath(import.meta.url)),
   '..',
   'prompts',
   'tarot-cards.json'
);

const getAllCards = (): TarotCard[] => {
   const data = fs.readFileSync(cardsPath, 'utf-8');
   return JSON.parse(data);
};

export const cardRepository = {
   getAllCards,
};
