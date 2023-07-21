import React, {SetStateAction} from "react";

type ChatFooterProps = {
  addMessage: (e: React.FormEvent<HTMLFormElement>) => void,
  text: string,
  setText: React.Dispatch<SetStateAction<string>>
}

export default function ChatFooter({ addMessage, text, setText }: ChatFooterProps) {


  return (
    <form onSubmit={addMessage}>
      <div className="px-4 pt-4 mb-2 border-t-2 border-gray-200 sm:mb-0">
      <div className="relative flex">

        <input
          type="text"
          value={text}
          onChange={(e: any) => setText(e.target.value)}
          placeholder="Write your message!"
          className="w-full py-3 pl-12 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md focus:outline-none focus:placeholder-gray-400"
        />
        <div className="absolute inset-y-0 right-0 items-center hidden sm:flex">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-4 py-3 text-white transition duration-500 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none"
          >
            <span className="font-bold">Send</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6 ml-2 transform rotate-90"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    </form>

  );
}
