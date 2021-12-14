import React, {useState, useEffect, useRef} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { axiosApi } from '../../../context/AuthContext';

function KatziTeamOrders() {

  // a state array which will contain a row objects
    const [rows, setRows] = useState([])

    // idRef is a state array that contains the the mongo db id of the items which are diplayed in ther rows table
    const idRef = useRef([])

// the use effect is trigered on render. the use effect fetches data from the order collection and gets all the 
// order items in an array. in the useEffect hook we iterate on the array using array.map and creating every time a row 
//object which will contain the data from the specific order item.
//we set the rows array state using  setRows with a function inside that adds the new created row object to the prevous ones.
//in addition to that we set the idRef.corrent array by pushing the item id from the DB to the idRef.current array,
//in the same order as we create the table rows which contain the order items themself.
//This means that the idRef.current array is parallel to the objects inside the rows array.
//This allows us to target later on the orders in the row, using the idnform the idRef.corrent array. 
//side note- in order to make a function async u must create a new one inside the useEffect hook
    useEffect(()=>{
       async function getData(){
        try{
            setRows([])
        const object = await axiosApi.get("http://localhost:3001/order/")
        console.log(object.data)
        object.data.map((item) =>{
          
           idRef.current.push(item._id)
           return(
            setRows((preValue)=>{
                return(
                [...preValue,
                createData(item.status , item.size, item.type, item.item ,item.username)
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
    },[])

// the handle click function handles the satus update button.
//we render the rows using array.map which allows us to capture the index of every row inside the rows array.
//as i stated earlier the rows array and the idRef.current array are parallel. This means that if we know the index
//of the row(and the order inside of it) we can get its DB id from the idRef.current using the same index.
//When we get hold of the orders id we can use axios.patch to update the orders staus.
//In order to see the status updating immediatly and not only after a refresh we create a new array newRows.
// we insert the previous rows objects, then we we update the status of the particular order and then we set the 
//original rows array with the updated order status
    const handleClick = async (index)=>{
        console.log(idRef.current[index])
        const id = idRef.current[index]
        try{
        let newRows = [...rows]
       newRows[index].status = "אושר" 
       const res = await axiosApi.patch(`http://localhost:3001/order/${id}`)
       console.log(newRows[index])
       setRows(newRows)
       console.log(res)
        }catch(err){
            console.log(err)
        }
    }
    

// the handle click function handles the satus deltee button.
//we render the rows using array.map which allows us to capture the index of every row inside the rows array.
//as i stated earlier the rows array and the idRef.current array are parallel. This means that if we know the index
//of the row(and the order inside of it) we can get its DB id from the idRef.current using the same index.
//When we get hold of the orders id we can use axios.delete to delete the order from the collection.
//In order to see the rows updating immediatly and not only after a refresh we need to updating the rows array.
//we do that using array.filter inside the setRows function then we remove the row with the specific index from the array.


    const handleDeleteClick = async (index)=>{
      const id = idRef.current[index]
      idRef.current.splice(index,1)
      console.log(idRef.current)
      try{
        const res = await axiosApi.delete(`http://localhost:3001/order/${id}`)
       setRows((preRows)=> preRows.filter((r)=>  
       {
        return (r !== preRows[index])
      }))
        console.log(res)
      }catch(err){
        console.log(err)
      }



    }

    // styling the table cell
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

      //styling the table rows
      
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
      function createData(status, size, type, item, username ) {
        return {status, size, type, item, username};
      }
    return (
        <div>
             <div>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
      {/* the table head row */}
        <TableHead>
          <TableRow>
          <StyledTableCell align="right">מחיקת הזמנה</StyledTableCell>
          <StyledTableCell align="right">אישור הזמנה</StyledTableCell>
            <StyledTableCell align="right">סטטוס</StyledTableCell>
            <StyledTableCell align="right">מידה</StyledTableCell>
            <StyledTableCell align="right">סוג</StyledTableCell>
            <StyledTableCell align="right">מוצר</StyledTableCell>
            <StyledTableCell align="right">שם משתמש</StyledTableCell>
            

          </TableRow>
        </TableHead>
        <TableBody>
        {/* rendering the rows using array.map */}
        {/* each row got 2 buttons, update status and a deket order button. each of the trigger a ahndleClick function */}
          {rows.map((row, index) => (
            <StyledTableRow  key={index}>
            <StyledTableCell align="right"><Button variant="contained" color="primary" onClick={()=>handleDeleteClick(index)}>מחיקה</Button></StyledTableCell>
            <StyledTableCell align="right"><Button variant="contained" color="primary" onClick={()=>handleClick(index)}>אישור</Button></StyledTableCell>
            <StyledTableCell align="right">{row.status}</StyledTableCell>
            <StyledTableCell align="right">{row.size}</StyledTableCell>
            <StyledTableCell align="right">{row.type}</StyledTableCell>
            <StyledTableCell align="right">{row.item}</StyledTableCell>
            <StyledTableCell align="right">{row.username}</StyledTableCell>

              
            
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
        </div>
        </div>
    )
}

export default KatziTeamOrders
