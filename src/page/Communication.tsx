import { client } from "@/connection/WebConnection";
import { ShareMessage } from "@/model/Model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSubscription } from "react-stomp-hooks";

export const Communication = () => {

  const [user] = useState(btoa(crypto.randomUUID()));

  const [message, setMessage] = useState<ShareMessage>();

  const [messages, setMessages] = useState<ShareMessage[]>([]);

  const send = () => {
    client.post("send-message", message);
  };

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage({
      sender: `${user}`,
      content: event.target.value,
    });
  };

  const addMessage = (accepted: ShareMessage) => {
    setMessages([...messages, accepted]);
  };

  useSubscription("/topic/reply", msg => addMessage(JSON.parse(msg.body) as ShareMessage));

  return <>
    <div className="box">
      {messages.map(msg => <div>{msg.sender}: {msg.content}</div>)}
      <input
        className="input"
        type="text"
        onChange={handleMessage}
      />
      <button
        className="button"
        onClick={send}>
        <FontAwesomeIcon icon={["fas", "paper-plane"]} />
      </button>
    </div>
  </>;
};
