export default function MessageBubble({ msg, mine }) {
  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      alignItems: mine ? "flex-end" : "flex-start",
      marginBottom:"10px"
    }}>
      <div style={{
        background: mine ? "#6366f1" : "#252535",
        color:"white",
        padding:"8px 12px",
        borderRadius: mine
          ? "12px 12px 2px 12px"
          : "12px 12px 12px 2px",
        maxWidth:"70%"
      }}>
        {msg.text}
      </div>

      <small style={{color:"#777"}}>
        {msg.id} · {msg.timestamp}
      </small>
    </div>
  );
}