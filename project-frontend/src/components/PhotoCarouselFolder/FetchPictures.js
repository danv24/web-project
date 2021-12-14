import React, {useState, useEffect} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {Carousel} from "react-responsive-carousel"
import "./CarouselPhotos.css"
import TextSlider from './TextSlider';
import { axiosApi } from '../../context/AuthContext';
function FetchPictures() {

const [imagePath, setImagePath] = useState([]);



useEffect(()=>{
    axiosApi.get("http://localhost:3001/images")
    .then(res => {
        const arrayNum = res.data.length;
        for( var i = 0; i < arrayNum; i++ ){
            const path = res.data[i].image.substring(8)
        
            setImagePath((preValue)=>{
                return([...preValue,`http://localhost:3001/${path}`])
                
             })
        }
      
           })
           .catch(err => {
               console.log(err)
           })
   }, [])

    return (

        <div className="second-page">
         <TextSlider />

        <div className="carousel-div">

       
        {/* <h1 className="crousel-title">גלריה</h1> */}
        <Carousel infiniteLoop autoPlay showThumbs={false}>
            
            {imagePath.map((singlePath, index)=>{
            
                return(<img alt="img" key={index} src={singlePath}/>)
            })}
            </Carousel>
        </div>
        </div>
    )
}

export default FetchPictures
