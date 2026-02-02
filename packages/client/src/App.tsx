import { useEffect, useState } from 'react';
import ChatBot from '@/components/chat/chatBot';

function App() {
   const [message, setMessage] = useState('');

   useEffect(() => {
      console.log('Fetching message from server...');
      fetch('/api/hello')
         .then((res) => res.json())
         .then((data) => setMessage(data.message))
         .catch((err) => console.error('Error fetching message:', err));
   }, []);

   if (!message) {
      return <p>No message available.</p>;
   }
   return (
      <div className="p-4">
         <p className="font-bold text-3xl">{message}</p>
         <ChatBot />
      </div>
   );
}

export default App;
