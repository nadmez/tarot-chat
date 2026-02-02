import { useForm } from 'react-hook-form';
import { FaArrowUp } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import type { ChatFormData } from '@/types';

type ChatInputProps = {
   onSubmit: (data: ChatFormData) => Promise<void>;
   isLoading?: boolean;
};

const ChatInput = ({ onSubmit, isLoading = false }: ChatInputProps) => {
   const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

   const formSubmitHandler = async (data: ChatFormData) => {
      reset({ prompt: '' });
      await onSubmit(data);
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(formSubmitHandler)();
      }
   };

   return (
      <form
         className="prompt-form flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
         onSubmit={handleSubmit(formSubmitHandler)}
      >
         <textarea
            {...register('prompt', {
               required: true,
               validate: (value) => value.trim().length > 0,
            })}
            placeholder="Ask me anything..."
            className="w-full border-0 focus:outline-0 resize-none"
            maxLength={1000}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            autoFocus
         ></textarea>
         <Button
            disabled={!formState.isValid || isLoading}
            className="rounded-full w-9 h-9"
         >
            <FaArrowUp />
         </Button>
      </form>
   );
};

export default ChatInput;
