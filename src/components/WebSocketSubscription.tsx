import { useState } from "react";
import { useSubscription } from "react-stomp-hooks";

export const WebSocketSubscription = () => {

  const [message, setMessage] = useState("");

  useSubscription('/topic/reply', (message) => { setMessage(message.body) });

  return <div>
    <p>{message}</p>
  </div>;
};
