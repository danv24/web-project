import React,{useState} from 'react'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import "./KatziTeam.css"
import { axiosApi } from '../../../context/AuthContext';

    function KatziTeam() {

      // state for bet uniforms
        const [size, setSize] = useState("")
        const [item, setItem] = useState("")
        const [stock,setStock] = useState("")
 

// state for beret-pin-tag (bpt)
const [bpt, setBpt] = useState("")
const [bptStock, setBptStock] = useState("")

// stock value in hebrew
const inStock = "קיים במלאי"
const outOfStock = "אזל המלאי"

// handlers of bet uniform form
//size
        const handleChange = (e)=>{
            setSize(e.target.value)
        }
//item
        const handleItemChange = (e)=>{
            setItem(e.target.value)
        }
//stock
        const handleStockChange = (e)=>{
            setStock(e.target.value)
        }

        // triggers by the handle click, collects the form data into an object and sends it as a put
        // request to the backend side
        const handleClick = async ()=>{
          const id = item + size;
          const object ={
            id,
            item,
            size,
            stock
          }
          try{
           const res=  await axiosApi.put("http://localhost:3001/bet/"+id, object)
           console.log(res)
          }
         catch(err){
           console.log(err)
         }
        }

      //hanldlers for beret-pin-tag form
//type of item
      const handleBptChange = (e)=>{
        setBpt(e.target.value)
      }
//stock
      const handleBptStockChange = (e)=>{
        setBptStock(e.target.value)
      }

 // triggers by the handle click, collects the form data into an object and sends it as a put
 // request to the backend side
      const handleBptClick = async ()=>{
        console.log(bptStock, bpt)
        
       const  id= bpt

        const object = {
          stock: bptStock,
          item: bpt
        }

        try{
          const res=  await axiosApi.put("http://localhost:3001/beret/"+id, object)
          console.log(res)
         }
        catch(err){
          console.log(err)
        }
      }

    return (
      <div className="form-div">

      {/* מדי ב. */}
      <FormControl style = {{width: "150px", marginRight: "50px"}} >
        <h1 style={{textAlign: "end"}}>מדי ב</h1>
        {/* a select form to size of the uniform */}
      <FormControl  >
      <InputLabel >מידה</InputLabel>
        <Select
          required
          value={size}
          label="size"
          onChange={handleChange}
        >
          <MenuItem value="small">קטן</MenuItem>
          <MenuItem value="average">בינוני</MenuItem>
          <MenuItem value="big">גדול</MenuItem>
          <MenuItem value="special">מיוחד</MenuItem>
        </Select>
        </FormControl>

      {/* a selct form to chose the type of uniform */}
      <FormControl >
        <InputLabel>סוג</InputLabel>
        <Select
          required
          value={item}
          label="item"
          onChange={handleItemChange}
        >
          <MenuItem value="shirt">חולצה</MenuItem>
          <MenuItem value="pants">מכנס</MenuItem>
          <MenuItem value="skirt">חצאית</MenuItem>
          
        </Select>
       {/* a select form to choose stock availability */}
        </FormControl>
      <FormControl >
        <InputLabel >מלאי</InputLabel>
        <Select
          required
          value={stock}
          label="stock"
          onChange={handleStockChange}
        >
          <MenuItem value={inStock}  >קיים במלאי</MenuItem>
          <MenuItem value={outOfStock}>אזל המלאי</MenuItem>
          
          
        </Select>

        </FormControl>
      {/* a button that triggers a handle click function that updates the items in the db */}
        <Button onClick={handleClick} variant="contained" color="primary">
        עדכן
      </Button>
        </FormControl>
    
      

{/* כומתה */}
        <FormControl  >
        <h1 style={{textAlign: "end"}}>כומתה/תג/סיכה</h1>
{/* a select form to choose the type of the item */}
        <FormControl >
        <InputLabel>סוג ציוד</InputLabel>
        <Select
          required
          value={bpt}
          label="shoes"
          onChange={handleBptChange}
        >
          <MenuItem value="beret">כומתה</MenuItem>
          <MenuItem value="pin">סיכה</MenuItem>
          <MenuItem value="tag">תג</MenuItem>

          
          
        </Select>
        </FormControl>
     
            {/* a select form to choose stock availability */}

        <FormControl >
        <InputLabel >מלאי</InputLabel>
        <Select
          required
          value={bptStock}
          label="stock"
          onChange={handleBptStockChange}
        >
          <MenuItem value={inStock}  >קיים במלאי</MenuItem>
          <MenuItem value={outOfStock}>אזל המלאי</MenuItem>
          
          
        </Select>

        </FormControl>
           {/* a button that triggers a handle click function that updates the items in the db */}

        <Button onClick={handleBptClick} variant="contained" color="primary">
        עדכן
      </Button>
        </FormControl>
        </div>
    )
}

export default KatziTeam
