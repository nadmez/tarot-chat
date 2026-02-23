import { supabase } from '../utils/supabase';

/**
 * Fetch all message rows for a conversation, ordered by creation time.
 * Returns an array of records matching the `messages` table schema.
 */
export const getMessages = async (
   conversationId: string
): Promise<
   Array<{
      id: string;
      conversation_id: string;
      user_prompt: string;
      ai_response: string;
      cards: string | null;
      created_at: string;
   }>
> => {
   const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

   if (error) {
      throw error;
   }

   // supabase returns null when there are no rows, normalize to empty
   return data || [];
};

/**
 * Save a single exchange in the messages table. The upstream service is
 * expected to provide `messageData` as a JSON string containing at least
 * `user_prompt` and `ai_response` properties. Additional `cards`
 * information may be included as well. The `messageId` will be used as
 * the primary key so callers can generate UUIDs client-side if desired.
 *
 * The `userId` argument is currently unused but is kept for future
 * extension (e.g. multi-user conversations).
 */
export const saveMessage = async (
   conversationId: string,
   messageId: string,
   messageData: string,
   userId: string
): Promise<void> => {
   // try parsing the payload, but fall back gracefully if it's plain text
   let payload: {
      user_prompt: string;
      ai_response: string;
      cards?: string;
   };

   try {
      payload = JSON.parse(messageData);
   } catch {
      // if parsing fails assume the entire string is the ai response;
      // we still need to provide a non-empty user_prompt so we stash a
      // placeholder.
      payload = {
         user_prompt: '',
         ai_response: messageData,
      };
   }

   const { error } = await supabase.from('messages').insert({
      id: messageId,
      conversation_id: conversationId,
      user_prompt: payload.user_prompt,
      ai_response: payload.ai_response,
      cards: payload.cards ?? null,
   });

   if (error) {
      throw error;
   }
};
