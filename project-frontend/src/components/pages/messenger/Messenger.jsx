import "./messenger.css";
import Conversation from "../../messeangerComponents/conversations/Conversation";
import Message from "../../messeangerComponents/message/Message";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { io } from "socket.io-client";
import {Link} from 'react-router-dom'
import InfoBar from "../../messeangerComponents/InfoBar/InfoBar";
import { axiosApi } from "../../../context/AuthContext";

export default function Messenger() {
  // a state array to contain our conversation
  const [rooms, setRooms] = useState([])
  // contains the current convesation that will be displayed on the chat,
  // changes every time the client chooses a different convesation
  const [currentChat, setCurrentChat] = useState(null);
  // a state array that contains the messages of the current chat
  const [messages, setMessages] = useState([]);
  // a state that will contain the message that we type
  const [newMessage, setNewMessage] = useState("");
  // const [arrivalMessage, setArrivalMessage] = useState(null);
  // const [onlineUsers, setOnlineUsers] = useState([]);
  // initiating socket as a ref
  const socket = useRef();

  // getting the user from Auth context use useContext hook
  const { user } = useContext(AuthContext);
  //  a ref that is a reference to evry single message
  const scrollRef = useRef();

  useEffect(() => {
    // its not an http connection, its a webSocket connection (wb)
    // creating the connection to the socket server
    // the useEffect is called only on render
    socket.current = io("ws://localhost:8900",{
      transports: ['websocket'],
      upgrade: false
   });
    // getting the message that someone sends to us
    socket.current.on("getMessage", (data) => {
      // using setArrivalMessage to set the state of the arivalMessage to the 
      // data that we got from the socket server
      // console.log(data)
      // setArrivalMessage({
      //   senderName: data.senderName,
      //   sender: data.senderId,
      //   text: data.text,
      //   createdAt: Date.now(),
      // });

      const messageObeject = {
        senderName: data.senderName,
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      }
  
      setMessages((prev) => [...prev, messageObeject]);
    });

  
  }, []);

  // the useEffect gets triggered on changes of arrivalMessage, currentChat
  // inside the useEffect we check if the there has been new arriving message
  // and if the current chat is with the person that sent new arriving message
  // then update the mesagges state array and add to it the arrivalMessage
  // useEffect(() => {
  
  //   arrivalMessage && currentChat &&
  //     currentChat?.members.includes(arrivalMessage.sender) &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, currentChat]);


// the useEffect hook is triggerd every time the user chagnges
  useEffect(() => {
    // sending to the socket server the user id .(data base id)
    socket.current.emit("addUser", user?._id);
    // 
    // socket.current.on("getUsers", (users) => {
    //   setOnlineUsers(
    //     user.followings.filter((f) => users.some((u) => u.userId === f))
    //   );
    // });
  }, [user]);

  // a useEfect that fetches the convesations of the user on render or if the user changes
  // we use axios.get to fetch the data from the /coversation route

  useEffect(() => {
    const getRooms = async () => {
      try {
        const res = await axiosApi.get("http://localhost:3001/room/" + user?._id);
       
        setRooms(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRooms();
  }, [user?._id,]);



  // useEffect hhok that gets the messages of the current chat using axios.get
  // fires the use effect whenever the currentchat changes
  useEffect(() => {
    const getMessages = async () => {
      try {
        // we use the currentChat id wich is the current convesation to pass it as part of the url to the backend so we can
        // fetch the messages of the current convesation
        // question mark to prevent an error
        const res = await axiosApi.get("http://localhost:3001/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);



// a function that triggers on botton click that post our message to the server using axios.post
  const handleSubmit = async (e) => {
    // prevents the page from rerendering
    e.preventDefault();
    // creating a message object that will contain: message text, senderId and convesationId
    const message = {
      sender: user?._id,
      senderName: user?.username,
      text: newMessage,
      conversationId: currentChat._id,
    };

    // sending a an object to the socket server that contains (sender.id,reciever.id,text)


    if(newMessage) {
      socket.current.emit('sendMessage', newMessage);
    }

    try {
      // posting the mesage object to the server
      const res = await axiosApi.post("http://localhost:3001/messages", message);
      // setting the messages state array to the privous messages and the sent message
      setMessages([...messages, res.data]);
      // setting the newMessage to "" so the text area will clear
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };


  // on Chat click setting the currentChat to the chat we pressed and
  // joining a room in socket.io
  const handleChatClick = (c) =>{
    setCurrentChat(c)
   
    const username = user?.username
    const room = c.roomname
    const userId = user?._id
    console.log(userId,username, room)
    socket.current.emit('join', { username, room ,userId}, (error) => {
      if(error) {
        alert(error);
      }
    });
  
  }

// targets the last message that we get/post and scrollIntoView 
// this makes the chat scroll down automaticlly so we will be able to see the last recieved message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);



  return (
    <>
      <div className="messenger">
      {/* chat menu shows the users you can chat with */}
        <div className="chatMenu">
          <div className="chatMenuWrapper">
          {/* input to search for users */}
            {/* <input placeholder="Search for chats" className="chatMenuInput" /> */}
            {/* mapping over the convesations state array to display all of the users conversations on screen */}
            {rooms.map((c,index) => (
              <div key={index} onClick={() => handleChatClick(c)}>
              {/* on convesation click we capture the current convesation and set the currentChat state to the convesation  */}
                {/* an imported conversation component */}
                <Conversation key={index} chat={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
          {/* if there is a current chat display the chat, else display a span that contains 
          Open a conversation to start a chat.
           */}
            {currentChat ? (
              <>
              <div className="info-nav-div">
                <InfoBar currentChat={currentChat} setRoom={setRooms} setCurrentChat={setCurrentChat}/>
                </div>
              {/* chat box top wil contain the messages */}
                <div  className="chatBoxTop">
            
                {/* mapping over our state array of messages that we got from the server 
                passing 2 props to the Message component, the first is the message it self
                and the second is a bool that depends if the message.send id is of our own user
                 */}
                  {messages.map((m,index) => (
                    <div className="messages-div" key={index} ref={scrollRef}>
                      <Message key={index} message={m} own={m.sender === user?._id} />
                    </div>
                  ))}
                
                  
                </div>
                {/* chat box bottom will contain the text area where we type the messages */}
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    // onChange effect that will trigger a function that will set the New message to the value that we type
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  {/* the botton the submits the */}
                  {/* on click trigger a handle submit function */}
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
              
            ) : (
              
              <span className="noConversationText">
                Open a chat to start 
              </span>
            )}
          </div>
        </div>
        {/* the onli chat div */}
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
          <Link className="button-links" to="/create-group">
              <button className="add-chat-btn"><h1>לחץ כאן כדי ליצור קבוצה חדשה</h1></button>
              </Link>
          <Link className="button-links" to="/join-group">
              <button className="add-chat-btn top" ><h1>לחץ כאן כדי להצטרף לקבוצה</h1></button>
              </Link>

          </div>
        </div>
      </div>
    </>
  );
}
