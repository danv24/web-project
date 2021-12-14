import React,{useState} from 'react'
//importing the react-modal packege
import Modal from "react-modal"
//importing the datetime packege that allows you to pick dates (an input for dates)
import Datetime from 'react-datetime';

function AddEventModal({isOpen, onClose, onEventAdded}) {
    // states that containts the value of the input below
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const [start,setStart] = useState(new Date())
    const [end,setEnd] = useState(new Date())


    // changing the value of the title state with an onChange event in the title input
    const handleChange = (event)=>{
        setTitle(event.target.value)
    }
    //changing the value of the content state with an onChange event in the content input
    const handleContentChange = (event)=>{
        setContent(event.target.value)
    }
    
  
    // the function that triggers on form Submit
    const onSubmit = (event)=>{
        //prevent the page from refreshing
        event.preventDefault();
            // setting the states as prameters inside onEventAdded function
        onEventAdded({title, content, start, end})
        // triggers a fuction that sete the modalOpen state to false and closes the form modal
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>
            {/* title  and  content input, they both trigger an onChange function that stores the data the client typed in a state */}
                <input placeholder="Title" value={title} onChange={handleChange}/>
                <input placeholder="Content" value={content} onChange={handleContentChange}/>


            {/* start and end date input using the Datetime packege,
             they both trigger an onChange function that stores the date the client picked in a state */}
                <div>
                    <label>Start Date</label>
                    <Datetime value={start} onChange={(date)=>setStart(date)} />
                </div>

                <div>
                    <label>Start End</label>
                    <Datetime value={end} onChange={(date)=>setEnd(date)} />
                </div>
                    {/* the button triggers the onSubmit event on the form */}
                <button>Add event</button>
            </form>

        </Modal>
    )
}

export default AddEventModal
