import "./message.css";
import React from 'react'
// library that helps us format time
import { format } from "timeago.js";

// takes own and message as props, own detrmins if the message is ours or not, message containts
// the message data
export default function Message({ message, own }) {

  
  return (
     // changing classes depending if the message is ours or someone elses
    // <ScrollToBottom className="message-flow">
   
    <div className={own ? "message own" : "message"}>
            <div className="messageSender">{own? "me" : message.senderName}</div>
      <div className="messageTop">
        {/* using the message prop to display message text */}
        
        <p className="messageText">{message.text}</p>
      </div>
      {/* using the message prop to display the time the message was sent, formating the time using timeago.js library */}
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
      
 
  );
}
