import React,{useState, useContext} from 'react'
import Modal from 'react-modal';
import "./ProductModal.css"
import {cardContext} from "../Katzi"
import ModalForm from './ModalForm';
import BeretForm from './BeretForm';
import ShoesForm from './ShoesForm';
import EquipmentForm from './EquipmentForm';
import AlefForm from './AlefForm';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function ProductModal(props) {

  Modal.defaultStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
      position: 'absolute',
      top: '40px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: 'px'
    }
  }
  
  const cardValues = useContext(cardContext);


    const [size, setSize] = useState("")
    const [stock,setStock] = useState("0")

    // const bptStock = props.itemArray[0].stock
  
    const handleChange = (e)=>{
      setSize(e.target.value)
        let result =[];
        result = props.itemArray.filter((item)=>{
            return(
            item.size === e.target.value
            )
        })
      
        setStock(result[0].stock)
        console.log(result[0].stock)
        console.log(props.item)
   
    }


    return (
        <div
           
            style={{paddingLeft: "0px"}}
            
        >
            <Modal  isOpen={props.isOpen}
            onRequestClose={props.onClose}
            portalClassName="modal"
           
            >
              <HighlightOffIcon className="close-icon" fontSize="large" onClick={props.onClose}/>
              <h1 className="title">{cardValues.title}</h1>
              {props.alefUniformForm && <AlefForm />}
              {props.uniformForm &&  <ModalForm  handleChange={handleChange} stock={stock} size={size}/>}
              {props.bptForm &&   <BeretForm  stock={props.beretStock}  />}
              {props.shoesForm && <ShoesForm />}
              {props.equipmentForm && <EquipmentForm />}
              <div className="img-div">
                <img className="modal-img" alt="item" src={cardValues.imgurl} style={{width: "500px", backgroundColor: "#e3e3e3"}}></img>
                </div>
            </Modal>
        </div>
    )
}

export default ProductModal
