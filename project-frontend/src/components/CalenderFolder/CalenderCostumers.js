import React, { useState, useEffect } from 'react'
// must go before plugins, importing the calender packegw
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import "./calender.css"
import { axiosApi } from '../../context/AuthContext'



function CalenderCostumers() {
    // a state array that constains all the events

const [events,setEvents] = useState([])

// the useEffect hook fetches the events from the data base every time the component renders.
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
        },[])


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
        
    return (
        <div>
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
      />
      </div>
        </div>
    )
}

export default CalenderCostumers
