import React, {useState,  useContext} from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import "./KatziCard.css"
import ProductModal from './ProductModal';
//importing carContext from katzi.js
import {cardContext} from "../Katzi"
import { axiosApi } from '../../../../context/AuthContext';


function KatziCard() {

  const [uniformForm, setUniformForm] = useState(false)
  const [shoesForm, setShoesForm] = useState(false)
  const [bptForm, setBptForm] = useState(false)
  const [equipmentForm, setEquipmentForm] = useState(false)
  const [alefUniformForm, setAlefUniformForm]  = useState(false)

  //useContext hook, taking the vlaue from katzi.js page, the value inside cardContext is the card object
const carValues = useContext(cardContext);


    const [isOpen, setIsOpen] = useState(false)

    const [itemArray, setItemArray] = useState([])

    const [beretStock, setBeretStock] = useState("")

    const handleClick= async ()=>{
      let res = []
      try{
        if(carValues.type  === "alef" ){
          res = await axiosApi.get(`http://localhost:3001/alef/${carValues.sex}/${carValues.item}`)
          setAlefUniformForm(true)
        }
        else if(carValues.item === "beret" || carValues.item === "pin" || carValues.item === "tag"){
          res = await axiosApi.get(`http://localhost:3001/beret/${carValues.item}`)
          setBeretStock(res.data[0].stock)
          setBptForm(true)
        }
      
        else if(carValues.item === "shoes"){
          setShoesForm(true)
        }
        else if(carValues.item === "office-equipment" || carValues.item ==="clear" ){
          setEquipmentForm(true)
        }
        else{
      res = await axiosApi.get(`http://localhost:3001/bet/${carValues.item}`)
      setUniformForm(true)
        }

            console.log(res.data)
            setItemArray(res.data)
            setIsOpen(true)
      }catch(err){
        console.log(err)
      }
    }


    function closeModal() {
        setIsOpen(false);
        setBptForm(false)
        setUniformForm(false)
        setShoesForm(false)
        setEquipmentForm(false)
      }

    return (
        <div>
                 <Card  className="card" sx={{ maxWidth: 250}}>
             <CardActionArea onClick={handleClick}>
                
                 <CardMedia
                 style={{backgroundColor: "#e3e3e3"}}
                component="img"
                height="230"
                image={carValues.imgurl}
                alt="army shoe"
                />
                  <CardContent className="card content">
                    <Typography gutterBottom variant="h5" component="div">
                    {carValues.title}
                    </Typography>
                     <Typography variant="body2" color="text.secondary">
                     {carValues.content}
                     </Typography>
                 </CardContent>
                 </CardActionArea>
              </Card>
              <ProductModal onClose={closeModal} isOpen={isOpen} itemArray={itemArray} 
              uniformForm={uniformForm} 
              shoesForm={shoesForm} 
              bptForm={bptForm} 
              equipmentForm={equipmentForm} 
               alefUniformForm={alefUniformForm} 
               beretStock = {beretStock}
              />
        </div>
    )
}

export default KatziCard
