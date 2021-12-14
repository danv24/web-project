import React, {useState, useEffect, useContext} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AuthContext } from '../../../context/AuthContext';
import { axiosApi } from '../../../context/AuthContext';



function CostumerOrders() {

    const {user} = useContext(AuthContext)

  // a state array which will contain a row objects
    const [rows, setRows] = useState([])

 // the use effect is trigered on render. the use effect fetches data from the order collection and gets all the 
// order items in an array. in the useEffect hook we iterate on the array using array.map and creating every time a row 
//object which will contain the data from the specific order item.
//we set the rows array state using  setRows with a function inside that adds the new created row object to the prevous ones.
useEffect(()=>{
   async function getData(){
    try{
    const object = await axiosApi.get(`http://localhost:3001/order/${user.username}`)
    console.log(object.data)
    object.data.map((item) =>{

        console.log("works")
    return(
        setRows((preValue)=>{
            console.log(object)
            return(
            [...preValue,
            createData(item.status , item.size, item.type, item.item)
            ]
            )
        })
    )  
      })
    }catch(err){
        console.log(err)
    }
}

getData();
},[user])

// style of the table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  //  style of the rows table
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

      // the function which insetes data to the row object, its used inside the use effect
  function createData(item, type, size, status ) {
    return {item, type, size, status};
  }




    return (
        <div>
            <h1 style={{textAlign: "end"}}>הזמנות</h1>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
      {/* the table head row */}
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">סטטוס</StyledTableCell>
            <StyledTableCell align="right">מידה</StyledTableCell>
            <StyledTableCell align="right">סוג</StyledTableCell>
            <StyledTableCell align="right">מוצר</StyledTableCell>
          

          </TableRow>
        </TableHead>
          {/* rendering the rows using array.map */}
        {/* each row got 2 buttons, update status and a deket order button. each of the trigger a ahndleClick function */}
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
         
              <StyledTableCell align="right">{row.item}</StyledTableCell>
              <StyledTableCell align="right">{row.type}</StyledTableCell>
              <StyledTableCell align="right">{row.size}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
            
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
        </div>
    )
}

export default CostumerOrders
