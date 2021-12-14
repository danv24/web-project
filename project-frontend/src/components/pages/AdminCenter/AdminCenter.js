import React, {useState} from 'react'
import "./AdminCenter.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { axiosApi } from '../../../context/AuthContext';
import { display } from '@mui/system';
function AdminCenter() {
    const [username, setUsername] = useState("")
    const [permissions, setPermissions] = useState("")

    const [toggle, setToggle] = useState(false)

    // taking the client user input and checking if there is one in the db
    // if the client exists pops a span for 2 seconds that notifies that the user exists
    const handleClick =  async ()=>{
        
        try{
        const res = await axiosApi.get(`http://localhost:3001/users/${username}`)
        console.log(res)
        if(res.status === 200) 
        {setToggle(true)
        setTimeout(()=>setToggle(false),2000)
        }
        else{
            setToggle(false)
        }
        }catch(err){
            console.log(err)
        }

    }

    const handleChange = async (e)=>{
        console.log(e.target)
    }

    // chnaging the permissions of the chosen user
    const handlePermission = async ()=>{
        console.log(permissions)
    }
// deleting the permissions of the chosen user
    const handleDeletePermissions = async ()=>{
        console.log("yep")
    }

    return (
        
        <div>
           <h1 className="admin-title" >לוח אדמין</h1>
           <div className="user-form-div">
          <FormControl >
          <FormControl 
          style={{ padding: "10px",
          border: "solid floralwhite",
          borderRadius:"10%",
         

  }}>
          <TextField 
           onChange={(e)=>setUsername(e.target.value)} 
           value={username} 
            label="בדוק עם משתמש קיים"
             variant="outlined" />

           <Button onClick={handleClick} color="primary" variant="contained" > בדוק אם קיים </Button>
           {toggle && <span>קיים</span>}
           </FormControl>
        
           <FormControl >
      <InputLabel>הוספת ומחיקת הרשאות</InputLabel>
        <Select
          required
          onChange={handleChange}
          value={permissions}
        >
          <MenuItem value="katzi-team">katzi-team</MenuItem>
          <MenuItem value="calender">calender</MenuItem>
          <MenuItem value="home-page">home-page</MenuItem>
     
    ],
        </Select>
        <Button style={{marginBottom: "10px"}} onClick={handlePermission} color="primary" variant="contained" >הוסף הרשאות</Button>
        <Button onClick={handleDeletePermissions} color="primary" variant="contained" >אפס הרשאות</Button>
        </FormControl>
       </FormControl>

       </div>
        </div>
    )
}

export default AdminCenter
