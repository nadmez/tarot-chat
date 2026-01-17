import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("Fetching message from server...");
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching message:", err));
  }, []);

  if (message) {
    return (
      <div className="p-4">
        <p className="font-bold text-3xl">{message}</p>
        <Button className="mt-4" variant="default">
          Click Me
        </Button>
      </div>
    );
  }

  return <>No message available.</>;
}

export default App;
