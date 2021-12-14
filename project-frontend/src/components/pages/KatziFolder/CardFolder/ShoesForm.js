import React, {useContext, useState} from 'react'
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

function ShoesForm() {
  const [size, setSize] = useState("")
  const cardValues = useContext(cardContext);
  const {user} = useContext(AuthContext)
  const handleChange = (e)=>{
    setSize(e.target.value)
  }

  const handleClick= async ()=>{
    console.log(size, cardValues.item, cardValues.sex)
    let hebrewType = ""
    try{
      if(cardValues.sex === "female"){
        hebrewType = "בנות"
      }else{
        hebrewType = "חיר"

      }
    const object = {
      item:"נעליים" ,
      username: user.username,
      type: hebrewType,
      size: size,
      status: "ממתין לאישור"
      
    }

   const res = await axiosApi.post("http://localhost:3001/order/", object)
   console.log(1 + res)
  }catch(err){
    console.log(err)
  }

  }

    return (
        <div>
             <Box className="stock-info" sx={{ maxWidth: 120, position:"absolute", right:"5%", top:"40%"}}>
             <h3>מידות</h3>
             <FormControl fullWidth
             >
        <InputLabel id="demo-simple-select-label">size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={size}
          label="size"
          onChange={handleChange}
          required
         >
           <MenuItem value="35">35</MenuItem>
          <MenuItem value="36">36</MenuItem>
          <MenuItem value="37">37</MenuItem>
          <MenuItem value="38">38</MenuItem>
          <MenuItem value="39">39</MenuItem>
          <MenuItem value="40">40</MenuItem>
          <MenuItem value="41">41</MenuItem>
          <MenuItem value="42">42</MenuItem>
          <MenuItem value="43">43</MenuItem>
          <MenuItem value="44">44</MenuItem>
          <MenuItem value="45">45</MenuItem>
          <MenuItem value="46">46</MenuItem>
          <MenuItem value="47">47</MenuItem>
          <MenuItem value="48">48</MenuItem>
        
        </Select>
       <Button onClick={handleClick} style={{marginTop: "20px"}} variant="contained" color="primary">הזמן</Button>
         </FormControl>
        </Box>
        </div>
    )
}

export default ShoesForm
