const conversations = new Map<string, string>();

const getLastConversationId = (conversationId: string) => {
   return conversations.get(conversationId);
};

const setLastConversationId = (
   conversationId: string,
   lastConversationId: string
) => {
   conversations.set(conversationId, lastConversationId);
};

export const conversationsRepository = {
   getLastConversationId,
   setLastConversationId,
};
