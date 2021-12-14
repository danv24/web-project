import React,{useState, useEffect} from 'react'
import "./AddPictures.css"
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import { axiosApi } from '../../context/AuthContext';
function AddSliderContent() {
// an array state that containt the content we get from the DB
    const [displayContent, setDisplayContent] = useState([])

    // a state that contains the user input
    const [content, setContent] = useState("")

    useEffect(()=>{
        const getContent = async ()=>{
         try{
             const res = await axiosApi.get("http://localhost:3001/slider")
             setDisplayContent(res.data)
      
         }catch(err){
             console.log(err)
         }
     }

     getContent();
     },[])

    // hnadleChnage gets triggered when there is a change on the text input, in the function
    // we use setContent to set the content state to the user input
    const handleChange = (e)=>{
        setContent(e.target.value)
    }
    
    //on button click we send a post request using axios with the data that we got from the client
    // in order to see the content render immediately we use setDisplayContent to  to change the content that
    //renders on the screen
    const handleClick = async ()=>{
        try{
            const object = {
                content: content
            }
            const res = await axiosApi.post("http://localhost:3001/slider", object)
            setDisplayContent((preContent)=>{
              return  ([...preContent, object ])
            })
        }catch(err){
            console.log(err)
        }
    }

    // gets triggered on content click, takes the inner hatml of the div and send a delete request using axios
    // then in order to see the content gets deleted immediately we use setDisplayContent to change the content that
    //renders on the screen
    const handleDeleteClick = async (e)=>{
        const id = e.target.innerHTML
        try{

            const res = await axiosApi.delete(`http://localhost:3001/slider/${id}`)
            setDisplayContent((contents)=> contents.filter((c, i)=>  
            {
             return (c.content !== e.target.innerHTML)
           }))
        }catch(err){
            console.log(err)
        }

    }

    return (
        <div className="slider-div">
        {/* form where the user can upload content to the slider */}
            <div className="image-form-div">
          
          <FormControl className="image-form" 
          style={{ padding: "10px",
          border: "solid floralwhite",
          borderRadius:"10%"

  }}>
          <h1 style={{color: "#53a8b6"}}>העלאת תוכן לסליידר</h1>
          <TextField inputProps={{min: 0, style: { textAlign: 'right' }}} onChange={handleChange} value={content} id="outlined-basic" label="תוכן" variant="outlined" />
           <Button onClick={handleClick} color="primary" variant="contained" > Upload </Button>
           </FormControl>
       </div>
          {/* delete content titles */}
          <h1 className="delete-title" style={{marginTop: "40px"}}>מחיקת תוכן</h1>
         <h5 className="delete-title">לחץ על תוכן בשביל למחוק</h5>
       <div className="content-div">
       {/* displaying the content in divs that got a onClick event */}
       {displayContent.map((singleContent, index)=>{
                return(
            <div onClick={handleDeleteClick} className="single-content" key ={index}>{singleContent.content}</div>
                )
            })}
       </div>
        </div>
    )
}

export default AddSliderContent
