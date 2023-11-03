import { useStompClient } from "react-stomp-hooks";

export const WebSocketPublish = () => {

  const stompClient = useStompClient();

  const sendMessage = () => {
    if (stompClient) {
      stompClient.publish({ destination: '/app/broadcast', body: 'Hello World' })
    }
  }

  return <div>
    <button onClick={sendMessage} className="button is-secondary">メッセージ送信</button>

  </div>;
}