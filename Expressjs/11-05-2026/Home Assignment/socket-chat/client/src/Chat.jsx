import { useEffect, useState } from "react";
import { socket } from "./socket";
import MessageBubble from "./MessageBubble";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState(0);
  const [typing, setTyping] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("chat_message", msg =>
      setMessages(prev => [...prev, msg])
    );

    socket.on("system_message", msg =>
      setMessages(prev => [...prev, {system:true, text:msg}])
    );

    socket.on("user_count", setOnline);

    socket.on("typing", ({userId,isTyping}) =>
      setTyping(isTyping ? userId : "")
    );
  }, []);

  const send = () => {
    if (!text.trim()) return;
    socket.emit("chat_message", { text });
    socket.emit("typing", false);
    setText("");
  };

  const typingHandler = e => {
    setText(e.target.value);
    socket.emit("typing", true);
    setTimeout(()=>socket.emit("typing", false),1500);
  };

  return (
    <div style={styles.page}>
      <div style={styles.chatBox}>

        {/* HEADER */}
        <div style={styles.header}>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={styles.greenDot}></div>
            <b>MINICHAT</b>
          </div>
          <div style={styles.online}>{online} online</div>
        </div>

        {/* MESSAGES */}
        <div style={styles.messages}>
          {messages.map((m,i)=>
            m.system ? (
              <div key={i} style={styles.system}>— {m.text} —</div>
            ) : (
              <MessageBubble
                key={i}
                msg={m}
                mine={m.id===socket.id?.slice(0,6)}
              />
            )
          )}
        </div>

        {/* TYPING */}
        <div style={styles.typing}>
          {typing && `${typing} is typing...`}
        </div>

        {/* INPUT */}
        <div style={styles.inputArea}>
          <input
            style={styles.input}
            value={text}
            onChange={typingHandler}
            onKeyDown={e=>e.key==="Enter" && send()}
            placeholder="Type a message..."
          />
          <button style={styles.btn} onClick={send}>SEND</button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page:{
    background:"#0f0f13",
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    fontFamily:"Courier New"
  },
  chatBox:{
    width:420,
    height:600,
    background:"#1a1a24",
    borderRadius:12,
    display:"flex",
    flexDirection:"column",
    border:"1px solid #2e2e42",
    boxShadow:"0 0 40px rgba(99,102,241,0.2)"
  },
  header:{
    background:"#12121c",
    padding:16,
    color:"#e2e8f0",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    borderBottom:"1px solid #2e2e42"
  },
  greenDot:{
    width:10,
    height:10,
    background:"#22c55e",
    borderRadius:"50%",
    boxShadow:"0 0 8px #22c55e"
  },
  online:{
    fontSize:12,
    background:"#6366f122",
    padding:"4px 10px",
    borderRadius:20,
    color:"#6366f1"
  },
  messages:{
    flex:1,
    overflowY:"auto",
    padding:16
  },
  system:{
    textAlign:"center",
    color:"#6b7280",
    fontSize:12,
    marginBottom:8
  },
  typing:{
    fontSize:11,
    color:"#6366f1",
    paddingLeft:16,
    height:18
  },
  inputArea:{
    display:"flex",
    gap:10,
    padding:12,
    borderTop:"1px solid #2e2e42",
    background:"#12121c"
  },
  input:{
    flex:1,
    background:"#1a1a24",
    border:"1px solid #2e2e42",
    borderRadius:8,
    padding:"10px",
    color:"white"
  },
  btn:{
    background:"#6366f1",
    color:"white",
    border:"none",
    borderRadius:8,
    padding:"10px 18px",
    cursor:"pointer"
  }
};