import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Message from "./Message";
import "./App.css";

const socket = io("http://localhost:3000");

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(1);
  const [typing, setTyping] = useState("");

  const messagesEndRef = useRef(null);
  const typingTimeout = useRef(null);

  // 📡 SOCKET EVENTS
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("chat_message", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          ...data,
          isMine: data.id === socket.id.slice(0, 6),
          type: "chat",
        },
      ]);
    });

    socket.on("system_message", (msg) => {
      setMessages((prev) => [...prev, { type: "system", text: msg }]);
    });

    socket.on("user_count", (count) => {
      setOnlineUsers(count);
    });

    socket.on("typing", ({ userId, isTyping }) => {
      setTyping(isTyping ? `${userId} is typing...` : "");
    });

    return () => socket.off();
  }, []);

  // 📜 AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🕒 time formatter
  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // ✉️ SEND MESSAGE
  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("chat_message", {
      text: input,
      timestamp: getTime(),
    });

    socket.emit("typing", false);
    setInput("");
  };

  // ⌨️ TYPING INDICATOR
  const handleTyping = (e) => {
    setInput(e.target.value);

    socket.emit("typing", true);
    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit("typing", false);
    }, 1500);
  };

  return (
    <div className="app">

      {/* HEADER */}
      <div className="chat-header">
        <div className="header-left">
          <img src="https://i.pravatar.cc/45" alt="" />
          <div>
            <h3>Global Chat</h3>
            <p>{typing ? typing : `${onlineUsers} online`}</p>
          </div>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="messages">
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} />
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* INPUT */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Type a message"
          value={input}
          onChange={handleTyping}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage}>➤</button>
      </div>

    </div>
  );
}

export default App;