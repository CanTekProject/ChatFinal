import { useEffect, useState, useRef } from "react";
import NavBar from "./ChatNavbar";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import ChatBody from "./ChatBody";
import { useNavigate } from "react-router-dom";
import IMessage from "../@types/Message";

type IChatProps = {
  socket: any;
};

export default function Chat({ socket }: IChatProps) {
  const navigation = useNavigate();
  const [roomSelected, setRoomSelected] = useState<number>(0);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState<string>("");
  const lastMessageRef = useRef<null | HTMLDivElement>(null);

  function handleRoom(roomNumber: number) {
    setRoomSelected(roomNumber);
  }

  function addMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (text.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: text,
        userName: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        roomNumber: roomSelected,
      });
    }
    setText("");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigation("/");
  });

  useEffect(() => {
    socket.on("messageResponse", (data: any) =>
      setMessages([...messages, data])
    );
  }, [messages, socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="flex flex-col justify-between flex-1 h-screen p:2 sm:p-6">
        <NavBar socket={socket} />
        <ChatHeader handleRoom={handleRoom} roomSelected={roomSelected} />
        <ChatBody
          messages={messages}
          roomSelected={roomSelected}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter
          addMessage={(e: React.FormEvent<HTMLFormElement>) => addMessage(e)}
          text={text}
          setText={setText}
        />
      </div>
    </>
  );
}
