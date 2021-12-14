// importing from socket.io and creating a socket server on port 8900
const io = require("socket.io")(8900, {
  // using cors to allow communications to our client
  cors: {
    origin: "http://localhost:3000",
  },
});

// let users = [];
// // The some() method tests whether at least one element in the array 
// // passes the test implemented by the provided function. It returns true or false
// // if the user with the same id does not exists it pushes a new user object that
// // contains userId and socketId
// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };

// // filtering over the users array and removing the user object that containts the socket id of the 
// // user that disconnected
// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// // taking a user id and using array.find to return the user object that has the same user id
// const getUser = (receiverId) => {
//   return users.find((user) => user.userId === receiverId);
// };

// // after every conncetion do excute whats inside the function
// io.on("connection", (socket) => {
//   //console logging every time a user has connected
//   console.log("a user connected.");

//   //take userId and socketId from user
//   socket.on("addUser", (userId) => {
//     // uses addUser function to add the user to the array if it hasnt been addd before
//     addUser(userId, socket.id);
//     // sending to everyone all the users
//     io.emit("getUsers", users);
//   });

//   //send and get message
//   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//     // using getUser to get the userObject of the receiving user
//     const user = getUser(receiverId);
//     // gets the socketId of the receiving user and sends only to this socket the message and the senderId
//     io.to(user.socketId).emit("getMessage", {
//       senderId,
//       text,
//     });
//   });

//   //diconnecting the client form the socket server
//   socket.on("disconnect", () => {
//     // console logging when a user has disconnected
//     console.log("a user disconnected!");
//     // removing the user from the users array when he disconnects
//     removeUser(socket.id);
//     // sending the updated users array to all the clients
//     io.emit("getUsers", users);
//   });
// });


// requiring the functions from the users module
const {addUser, removeUser, getUser, getUsersInRoom} = require("./user")
//a function that runs every single time a client connects to our server
// io.set('transports', ['websocket']);
//a function that runs every single time a client connects to our server

io.on('connection', (socket)=>{

  socket.on('join', ({username, room, userId}, callback)=>{
      console.log("enters room")
      //deconstructing the addUser function that returns an error or a user. adding the parameters
      //to the function from the socket data
  const {error, user} = addUser({id: socket.id, username, userId, room});

 
  // error handling in the addUser function, if there is an error we use a callback fuction to return it
      if(error) return callback(error)

      // send the user an admin welcome message for joining a room
      socket.emit('message', {user: 'admin', text: `${user.name} welcome to ${user.room} chat`})
      // sends every other user in the chat a message that a new user has entered
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

      // joining the room specified in the client input
      socket.join(user.room)

      // sends to the client the room name and the number of users in the room
      // io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

      callback();
  });

// waits for the client message
 socket.on('sendMessage', (message) => {
  //    gets the user by entering the socket.id to the getUser function
  const user = getUser(socket.id);

   
  console.log("progress")
  // sends the message that the user entered to all sockets inside the users room
  io.to(user.room).emit('getMessage', { senderName: user.username,senderId: user.userId, text: message });

 
// calls the callback function

});

  // disconnecting when the client leaves the room
  socket.on('disconnect', ()=>{
    console.log("user has left")
      const user = removeUser(socket.id)

      if(user){
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
     
  })
})
