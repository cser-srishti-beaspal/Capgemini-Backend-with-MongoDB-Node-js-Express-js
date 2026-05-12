import React from "react";

const Message = ({ msg }) => {
  if (msg.type === "system") {
    return <div className="system-message">{msg.text}</div>;
  }

  return (
    <div className={`message-row ${msg.isMine ? "mine" : ""}`}>
      <div className="message-bubble">
        <div className="message-text">{msg.text}</div>
        <div className="message-meta">{msg.timestamp}</div>
      </div>
    </div>
  );
};

export default Message;