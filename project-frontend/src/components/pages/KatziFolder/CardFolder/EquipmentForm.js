import React from 'react'
import Box from '@mui/material/Box';

function EquipmentForm() {
    return (
        <div>
             <Box className="stock-info" sx={{ maxWidth: 200, position:"absolute", right:"5%", top:"40%"}}>
           <h3>מלאי מלא</h3>
           <h5>יש להגיע לאפסנאות כדי לאסוף את הציוד</h5>
        </Box>
        </div>
    )
}

export default EquipmentForm
