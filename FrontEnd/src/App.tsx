import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { io } from "socket.io-client";
import Chat from "./components/Chat";
import Login from "./components/ChatLogin";
function App() {
  const socket = io("ws://localhost:4000");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
