export type FormData = {
   prompt: string;
};

export type ChatResponse = {
   message: string;
};

export type Message = {
   content: string;
   role: 'user' | 'bot';
};
