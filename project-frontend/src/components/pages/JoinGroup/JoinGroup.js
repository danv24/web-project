import  React, {useState, useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { axiosApi } from '../../../context/AuthContext';

function JoinGroup() {
    const [room, setRoom ] = useState("")
    const [password, setPassword] = useState("")

    const {user} = useContext(AuthContext)
    
    const history = useHistory()

    const handleClick = async (e)=>{
      e.preventDefault();

        console.log(user._id,room,password)

      const object = {
        roomname: room,
        userId: user._id,
        password: password
      }

      try{
        const res = await axiosApi.patch("http://localhost:3001/room", object)
        console.log(res)
        setRoom("")
        setPassword("")
        history.push('/chat')
      }catch(err){
        console.log(err)
      }
    }
    

    
      return (
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            
              </Avatar>
              <Typography component="h1" variant="h5">
                Join Chat
              </Typography>
              <Box component="form"  noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="room"
                  type="text"
                  label="Room"
                  id="room"
                  onChange={(e)=>{setRoom(e.target.value)}}
                  value={room}
                />
                 <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type="text"
                  label="password"
                  id="password"
                  onChange={(e)=>{setPassword(e.target.value)}}
                  value={password}
                />
             
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClick}
                >
                Enter Chat
                </Button>
            
              
              </Box>
            </Box>
          </Container>
      );
    }

export default JoinGroup
