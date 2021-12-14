import Button from '@mui/material/Button';
import React, { useContext} from 'react'
import { AuthContext } from '../../../context/AuthContext'
import "./Infobar.css"
import { axiosApi } from '../../../context/AuthContext';

function InfoBar({currentChat, setRoom, setCurrentChat}) {

        const {user} = useContext(AuthContext)
        // const [navbar, setNavbar] = useState(false)

   

   
    
    const handleClick = async ()=>{


        console.log(currentChat._id, user._id)
        const object = {
            roomId : currentChat._id,
            userId : user._id 
        }
        try{
            
            setRoom((preValue)=>{
                return(
                preValue.filter(room => room._id !== currentChat._id)
                )
            })
       const res = await axiosApi.patch('http://localhost:3001/room/exist', object)
       setCurrentChat("")
       console.log(res)
            
        }catch(err){
            console.log(err)
        }
    }

    return (
     
        <div className= "infoBar">
            <div className="leftInnerContainer">
                <h3>{currentChat.roomname}</h3>

            </div>
            <div className="rightInnerContainer">
                <Button onClick={handleClick} className="leave-btn" color="inherit">Leave Groupe</Button>
            </div>
        </div>
       
    )
}

export default InfoBar
