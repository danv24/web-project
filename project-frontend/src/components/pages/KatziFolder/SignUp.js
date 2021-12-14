import  React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



export default function SignUp() {
const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")

const [IN, setIN] = useState("")
  const handleSubmit = (event) => {
    event.preventDefault();
  
    console.log(
      firstName, IN
    );
  };

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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="first-name"
              type="text"
              autoComplete="first-name"
              autoFocus
              onChange={(e)=>{setFirstName(e.target.value)}}
              value={firstName}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="lasrName"
              label="Last Name"
              name="lasr-name"
              type="text"
              autoComplete="lasr-name"
              onChange={(e)=>{setLastName(e.target.value)}}
              value={lastName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="identity-number"
              type="text"
              label="Identity Number"
              id="identityNumber"
              onChange={(e)=>{setIN(e.target.value)}}
              value={IN}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid item>
                <Link href="http://localhost:3000/katzi/" variant="body2">
                  {"Already got an account? Sign In"}
                </Link>
              </Grid>
          </Box>
        </Box>
      </Container>
  );
}