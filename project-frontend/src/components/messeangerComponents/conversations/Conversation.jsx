
import "./conversation.css";

// we get 2 props, the first one is a single convesation between our user and other user,
// the second prop is our user
export default function Conversation({ chat }) {


console.log(chat)
  return (
    <div className="conversation">
    
      {/* user name- passing the friends username that we got from the server */}
      <span className="conversationName">{chat.roomname}</span>
    </div>
  );
}
