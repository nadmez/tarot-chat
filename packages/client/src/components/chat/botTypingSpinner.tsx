interface DotProps {
   extraClass?: string;
}

function Dot({ extraClass = '' }: DotProps) {
   const baseClasses = 'w-2 h-2 rounded-full bg-gray-800 animate-pulse';
   const combinedClasses = extraClass
      ? `${baseClasses} ${extraClass}`
      : baseClasses;

   return <div className={combinedClasses}></div>;
}

export default function BotTypingSpinner() {
   return (
      <div className="flex self-start gap-1 px-3 py-3 bg-gray-200 rounded-xl">
         <Dot />
         <Dot extraClass="[animation-delay:0.2s]" />
         <Dot extraClass="[animation-delay:0.4s]" />
      </div>
   );
}
