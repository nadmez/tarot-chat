import { supabase } from '../utils/supabase';

// in-memory map kept for legacy /fallback logic; most callers should
// eventually move to the database-backed versions below.
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

/**
 * Persist the latest conversation data in the `conversations` table.
 *
 * The schema defined in `tables.txt` has a `last_response_id` text column
 * which we use to store the opaque conversation payload passed by callers.
 * If a row for `conversationId` already exists we perform an upsert so the
 * value is kept in sync.
 */
export const saveConversation = async (
   conversationId: string,
   conversationData: string
): Promise<void> => {
   const { error } = await supabase.from('conversations').upsert(
      {
         conversation_id: conversationId,
         last_response_id: conversationData,
      },
      { onConflict: 'conversation_id' }
   );

   if (error) {
      // bubble up so callers can handle/log as needed
      throw error;
   }
};

/**
 * Retrieve the stored conversation payload (last_response_id) for a
 * given conversation id. Returns `null` when the conversation cannot be
 * found.
 */
export const getConversation = async (
   conversationId: string
): Promise<string | null> => {
   const { data, error } = await supabase
      .from('conversations')
      .select('last_response_id')
      .eq('conversation_id', conversationId)
      .maybeSingle();

   if (error) {
      throw error;
   }

   return data?.last_response_id ?? null;
};
