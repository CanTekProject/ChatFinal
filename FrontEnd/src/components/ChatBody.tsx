import React from "react";

import IMessage from "../@types/Message";

type ChatBodyProps = {
  messages: IMessage[];
  roomSelected: number;
  lastMessageRef: any
};

export default function ChatBody({ messages, roomSelected, lastMessageRef }: ChatBodyProps) {
  return (
    <div
      id="messages"
      className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      {messages &&
        messages.filter((n) => n.roomNumber === roomSelected).map((message, i) => {
          return localStorage.getItem("userName") === message.userName ? (
            <div className="chat-message" key={i}>
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                      {message.text}
                    </span>
                  </div>
                </div>
                <span className="order-1 italic">You</span>
              </div>
            </div>
          ) : (
            <div className="chat-message" key={i}>
              <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                      {message.text}
                    </span>
                  </div>
                </div>
                <span className="order-1 italic">{message.userName}</span>
              </div>
            </div>
          );
        })}
        <div ref={lastMessageRef} />
    </div>
  );
}
