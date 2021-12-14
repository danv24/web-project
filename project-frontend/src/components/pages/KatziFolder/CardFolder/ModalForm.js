import React from 'react'
import "./ProductModal.css"
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from '@mui/material/Box';

function ModalForm(props) {
    return (
        <div>
            <Box className="stock-info" sx={{ maxWidth: 120, position:"absolute", right:"5%", top:"40%"}} >
             <h3>מלאי</h3>
             <FormControl fullWidth
             >
        <InputLabel id="demo-simple-select-label">size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.size}
          label="size"
          onChange={props.handleChange}
         >
           <MenuItem value="small">קטן</MenuItem>
          <MenuItem value="average">בינוני</MenuItem>
          <MenuItem value="big">גדול</MenuItem>
          <MenuItem value="special">מיוחד</MenuItem>

        </Select>
        <h5>{props.stock}</h5>
         </FormControl>
        </Box>
        </div>
    )
}

export default ModalForm
