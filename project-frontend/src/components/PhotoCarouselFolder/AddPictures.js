import React, {useState, useEffect, useRef} from 'react'
import { Button } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import "./AddPictures.css"
import { axiosApi } from '../../context/AuthContext';
function AddPictures() {

      // idRef is a state array that contains the the mongo db id of the images which are diplayed 
      const idRef = useRef([])

    //   a state that contains the chosen file
    const [selectedFile, setSelectedFile] = useState(null)

//  a state array that contains  the paths of the images
    const [imagePath, setImagePath] = useState([]);


// we use the useEffect hook to fetch the image path from the db every render,
// we loop over the array of paths we got from the data base.
//in addition to that we set the idRef.corrent array by pushing the item id from the DB to the idRef.current array,
//in the same order as we create the imagePath.
// we cut the path string so it will only contain the image name.
//when we setImage path we take the paths from the db and merge them with the full path string
//and then store in in the array state
    useEffect(()=>{
        const fetchImages = async()=>{
            try{
                const res = await  axiosApi.get("http://localhost:3001/images")
                console.log(res)
                const arrayNum = res.data.length;
                for( var i = 0; i < arrayNum; i++ ){
                    const path = res.data[i].image.substring(8)
                    idRef.current.push(res.data[i]._id)
                    setImagePath((preValue)=>{
                        return([...preValue,`http://localhost:3001/${path}`])
                        
                     })
                }
            }catch(err){
                console.log(err)
            }
        }

        fetchImages();
       }, [])

       //on change of the input file we save the chosen file in the state
    const handleChange = (event)=>{
        console.log(event.target.files[0])
        setSelectedFile(event.target.files[0])
    }

//  on click we take the chosen file from the state and send a post request using axios.
// in order to do post a file to the db we need to create a new Form data.
// after the post request we change the imagePath array using the setImagePath function 
//so we can imedialtly see the added photo
    const handleClick = async ()=>{

        console.log(selectedFile.name)
        if(selectedFile === null){
            return
        }
        else{
        const fd = new FormData();
        fd.append("image", selectedFile, selectedFile.name);
     
        try{
       const res = await axiosApi.post("http://localhost:3001/images", fd)
       setImagePath((prePath)=>{
        return([...prePath,`http://localhost:3001/${selectedFile.name}`])
    })
            console.log(res)
        }
        catch(err){
            console.log(err)
        }
    }
    }

    // on picture click we take the index of the picture, the idRef.current array contains ids that 
    //are paralel to the paths of the images in the imagePath, this means that if we have the image index we have 
    //its DB id. with the id we can send a delete request using axios.
    //we set the imagePath to new array without the deleted picture so we can imediatlly see the deleted item disapear.
    const handleDeleteClick = async (index)=>{

        const id = idRef.current[index]
        idRef.current.splice(index,1)
        console.log(idRef.current)
        try{
          const res = await axiosApi.delete(`http://localhost:3001/images/${id}`)
         setImagePath((paths)=> paths.filter((path, i)=>  
         {
          return (i !== index)
        }))
          console.log(res)
        }catch(err){
          console.log(err)
        }
    }

    

    return (
        <div>
        {/* a form for uploading pictures */}
        <div className="image-form-div">
          
           <FormControl className="image-form" 
           style={{ padding: "10px",
           border: "solid floralwhite",
           borderRadius:"10%"

   }}>
           <h1 style={{color: "#53a8b6"}}>העלאת תמונה</h1>
            <Button
            style={{marginTop: "20px", marginBottom: "20px"}}
             variant="contained" component="label" >
            Choose file
             <input type="file" onChange={handleChange} hidden/>
            </Button>
            <Button color="primary" variant="contained" onClick={handleClick}>Upload file</Button>
            </FormControl>
        </div>
        {/* delete image titles */}
        <h1 className="delete-title" style={{marginTop: "40px"}}>מחיקת תמונה</h1>
         <h5 className="delete-title">לחץ על התמונה בשביל למחוק</h5>
        {/*  a div that contains the pictures with a onClick event on them */}
         <div  className="image-div">
            {imagePath.map((singlePath, index)=>{
    
             return(<img  onClick={()=>handleDeleteClick(index)} className="img-edit" alt="img" key={index} src={singlePath}/>)
           })}
    
        </div>
        </div>
    )
}

export default AddPictures
