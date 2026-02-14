export type ChatFormData = {
   prompt: string;
};

export interface TarotCard {
   type: 'major' | 'minor';
   name_short: string;
   name: string;
   value: string;
   value_int: number;
   meaning_up: string;
   meaning_rev: string;
   desc: string;
   image_url: string;
   suit?: 'wands' | 'cups' | 'pentacles' | 'swords';
}

export type ChatResponse = {
   message: string;
   cards: TarotCard[];
};

export type Message = {
   content: string;
   role: 'user' | 'bot';
};
