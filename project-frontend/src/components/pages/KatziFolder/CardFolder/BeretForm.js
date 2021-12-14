import React from 'react'
import Box from '@mui/material/Box';
import "./ProductModal.css"

function BeretForm(props) {
    return (
        <div style={{backgroundColor: "gray"}}>
         <Box className="stock-info" sx={{ width: "140", position:"absolute", right:"5%", top:"40%"}}>
           <h3 >:מלאי</h3>
           <h5 >{props.stock}</h5>
        </Box>
        </div>
    )
}

export default BeretForm
