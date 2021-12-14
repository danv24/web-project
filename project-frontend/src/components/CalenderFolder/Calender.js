import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddEventModal from './AddEventModal'
// must go before plugins, importing the calender packegw
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import "./calender.css"
import { axiosApi } from '../../context/AuthContext'

function Calender() {
    // the state that is responsibole for the modal form appearing on the screen
    const [modalOpen, setModalOpen] = useState(false)
    // a state array that constains all the events
    const [events,setEvents] = useState([])
  

// the handleEventAdd that is responsible for sending the client data to the backend
//it takes the event object that it gets from the onEventAdded prop from the addEventModal, creates an object with the (title,content,start,end) properties
//and sends it to the backend server
    const handleEventAdd = async (data)=>{
      console.log(data)
      const object = {
        title :data.title,
        start :data.start,
        end : data.end,
        content: data.content
       
      }
      await axiosApi.post("http://localhost:3001/event", object)

    }

// the useEffect hook fetches the events from the data base every time there is a chnage
// in the stae of madalOpen, meaning every time someone opens the form modal => posts an event
  useEffect(  ()=>{
    const fetchData = async ()=>{
      try{
      const response = await axiosApi.get("http://localhost:3001/event")
       setEvents(response.data);  
       
    }
      
      catch(err){
        console.log(err)
      }
    }
    fetchData();
    },[modalOpen])

    // by default we cannot add content to the event object that renders in the calander,
    // in order to do that we to add an eventContent property to the calander,
    // the render content function sets the content that will be rendered in the event
    //beacuse the content is not in the event object by default we need to use exetendetProps to add it
    const renderContent = (event)=>{
  
      console.log(events[0]._id)
        return(
          <div>
         
          <span className="span-time">{event.timeText}</span>
          <br />
          <span className="span-title">{event.event.title}</span>
          <br />
         <span className="span-content">{event.event.extendedProps.content}</span>
          </div>
        )
    }
  
    // on event Click we colect the event id and send it to our backend server, the server takes the id 
    // and deletes the event, in order to delete the event from the screen we filter through the events array and delete
    //the event with the matching id.
    const handleEventClick = async (eventInfo)=>{
      try{
      console.log(eventInfo.event.extendedProps._id)
      const id = eventInfo.event.extendedProps._id

       const res = await axiosApi.delete("http://localhost:3001/event/"+id)
       setEvents((preEvents)=> preEvents.filter(e=>e._id !== id))
       console.log(res)
      }catch(err){
        console.log(err)
      }
    }

    return (
        <div>
        {/* the buttom click triggers an onClick event that sets the modalOpen to true and makes the modal form apear */}
<Button style={{background: "#5585b5", color: "white"}} onClick={()=>setModalOpen(true)}>Add event </Button>

        {/* returning the calender component  the position and the index allows the modal form to go infront of the calander*/}
        <div className="calender" style={{position: "relative", zIndex: 0}}>
             <FullCalendar
             //the hight property changes the hight of the calander,
             //If "auto" is specified, the view’s contents will assume a natural height and no scrollbars will be used.
              height="auto"
              //the color of the events
              eventColor="#5585b5"
              //eventContent- the property we need in order to add content to our event object
             eventContent={renderContent}
            //  the events that we get from our data base that will render on the calander
             events={events}
             //property that allows us to add plugins
        plugins={[ dayGridPlugin ]}
        // the view of the calender is set to month view
        initialView="dayGridMonth"
        // event click property triggers the handleEventClick function that allows us to delete functions
        //sends an event object to the function
        eventClick={handleEventClick}
      />
      </div>

            {/* the modal AddEventModal opens depending on the state of modalOpen state (isOpen)
                the on close parameter is calling a fucntion the sets the state of ModalOpen to false and closisng the modal by doing it
                the onEventAdded parmameter passe an anonymous function that passes the event the the handleEventAdd fuction inside it
                (the event contains the values of: title, start, end, content)
             */}
        <AddEventModal isOpen={modalOpen} onClose={()=>setModalOpen(false)} onEventAdded={(event=>handleEventAdd(event))}  />

        </div>
    )
}

export default Calender
