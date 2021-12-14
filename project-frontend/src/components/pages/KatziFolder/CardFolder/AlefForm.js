import React, {useState, useContext} from 'react'
import "./ProductModal.css"
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {cardContext} from "../Katzi"
import { AuthContext } from '../../../../context/AuthContext';
import { axiosApi } from '../../../../context/AuthContext';

function AlefForm() {
    const cardValues = useContext(cardContext);
    const {user} = useContext(AuthContext)

    const [size, setSize]= useState("")

    const handleChange = (e)=>{
        
        setSize(e.target.value)
    }
    
    const handleClick= async ()=>{
      console.log(size, cardValues.item, cardValues.sex)
      let hebrewType = ""
      let hebrewItem = ""
      try{
        if(cardValues.sex === "female"){
          hebrewType = "בנות"
        }else{
          hebrewType = "בנים"
  
        }

        switch(cardValues.item) {
          case "shirt":
            hebrewItem = "חולצת אלף"
            break;
          case "skirt":
            hebrewItem = "חצאית אלף"
            break;
            case "pants":
              hebrewItem = "מכנס אלף"
            break;
            case "sweater":
              hebrewItem = "סוודר אלף"
            break;
          default:
            hebrewItem = ""
        }

      const object = {
        item: hebrewItem ,
        username: user.username,
        type: hebrewType,
        size: size,
        status: "ממתין לאישור"
        
      }
  
     const res = await axiosApi.post("http://localhost:3001/order/", object)
     console.log(res)
    }catch(err){
      console.log(err)
    }
  
    }
    

    return (
        <div>
               <Box className="stock-info" sx={{ maxWidth: 120, position:"absolute", right:"5%", top:"40%"}}>
             <h3>מידה</h3>
             <FormControl fullWidth
             >
        <InputLabel id="demo-simple-select-label">size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={size}
          label="size"
          onChange={handleChange}
         >
           <MenuItem value="small">קטן</MenuItem>
          <MenuItem value="average">בינוני</MenuItem>
          <MenuItem value="big">גדול</MenuItem>
          <MenuItem value="special">מיוחד</MenuItem>

        </Select>
        <Button onClick={handleClick} style={{marginTop: "20px"}} variant="contained" color="primary">הזמן</Button>

         </FormControl>
        </Box>
        </div>
    )
}

export default AlefForm
