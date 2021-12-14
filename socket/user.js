const users = [];

const addUser = ({ id, username, userId, room }) => {
    //making the name and room string lower case with no white spaces
  
  username = username.toLowerCase();
  room = room.toLowerCase();

// finding if the user exists in the array
//The find() method returns the value of the first element in the provided array that satisfies the provided testing function
  const existingUser = users.find((user) => user.room === room && user.name === username);

//  if there has been no room or name entered throw an error
  if(!username || !room) return { error: 'Username and room are required.' };
//   if the user alreay exists in a room with the same name throw an error
  if(existingUser) return { error: 'Username is taken.' };

//  creating a new user from the data we get
  const user = { id, username, room ,userId};

//   pushing the user into the users array
  users.push(user);

//   returning the user
  return { user };
}


const removeUser = (id) => {
    //The findIndex() method returns the index of the first element in the array that satisfies the provided testing function.
    //we are getting the index of the user with a specific id in the users array
  const index = users.findIndex((user) => user.id === id);

//   we delete the user from the users array using the index we got and the array.splice method
  if(index !== -1) return users.splice(index, 1)[0];
}

// getting the user with a specific socket id using array.find
const getUser = (id) => users.find((user) => user.id === id);

// filtering throw the user array and returning the users in a specific room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

// exporting the functions

module.exports = {addUser, removeUser, getUser, getUsersInRoom}