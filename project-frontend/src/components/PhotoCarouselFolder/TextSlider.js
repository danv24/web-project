import React, {useState,useEffect} from 'react'
import Marquee from "react-fast-marquee";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { axiosApi } from '../../context/AuthContext';
export function MarqueeContent (props){

    return(
        <div style={{display:"flex", alignItems:"center"}}>
        <h2 style={{display:"flex", alignItems:"center",marginLeft: "30px", marginRight: "30xp"}}>
        <FiberManualRecordIcon  fontSize="small" /> 
        {props.content}
        <FiberManualRecordIcon fontSize="small" /> 
        </h2>
        </div>
    )
}
function TextSlider() {

    const [content, setContent] = useState([])

    useEffect(()=>{
        const getContent = async ()=>{
         try{
             const res = await axiosApi.get("http://localhost:3001/slider")
             setContent(res.data)
      
         }catch(err){
             console.log(err)
         }
     }

     getContent();
     },[])


    return (
        <div style={{paddingTop: "100px"}}>
        <Marquee 
        style={{
            height:"120px",
            backgroundColor:"#53a8b6",
            color: "white",
           
        }}
        speed="100"
        pauseOnHover="true"
        gradientColor="[]"
        >
            {content.map((singleContent, index)=>{
                return(
            <MarqueeContent key ={index} content={singleContent.content} />
                )
            })}
    
    

        </Marquee>
    </div>
    )
}

export default TextSlider
