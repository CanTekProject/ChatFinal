import React, { SetStateAction } from "react";

type ChatHeaderProps = {
  // setRoomSelected: React.Dispatch<SetStateAction<number>>;
  roomSelected: number;
  handleRoom: (roomNumber: number) => void;
};

export default function ChatHeader({
  handleRoom,
  roomSelected,
}: ChatHeaderProps) {
  return (
    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
      <div className="relative flex items-center space-x-4">
        <div className="flex flex-col leading-tight">
          <div className="text-2xl mt-1 flex items-center">
            <span className="text-gray-700 mr-3">
              {localStorage.getItem("userName")}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleRoom(0)}
          type="button"
          className={`inline-flex items-center justify-center ${
            roomSelected === 0 ? "bg-gray-400" : ""
          } rounded-lg border h-10 w-16 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none`}
        >
          General
        </button>
        <button
          onClick={() => handleRoom(1)}
          type="button"
          className={`inline-flex items-center justify-center rounded-lg border ${
            roomSelected === 1 ? "bg-gray-400" : ""
          }   h-10 w-16 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none`}
        >
          Room 1
        </button>
        <button
          onClick={() => handleRoom(2)}
          type="button"
          className={`inline-flex items-center justify-center rounded-lg border h-10 w-16 ${
            roomSelected === 2 ? "bg-gray-400" : ""
          } transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none`}
        >
          Room 2
        </button>
      </div>
    </div>
  );
}
