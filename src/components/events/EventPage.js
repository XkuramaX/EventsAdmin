import React, {useState, useEffect} from 'react'
import config from '../../config.json'
import EventOptions from './EventOptions'
import EditEvent from './EditEvent'
import ViewMembers from './ViewMembers'
import Register from './Register'

function EventPage({event, deleteEvent, setPageOptions, types, details, setDetails, editHandler, options, setOptions, setSelectedEvent}) {
    
    const dateArr = Date(event.date).split(" ")
    let dateString = ""
    dateArr.forEach((item, i)=> i<4? dateString+=item+" ": dateString+="")

    console.log("options", options)
    return <div className="card">
    <h5 className="card-header">{event.name}</h5>
    <div className="card-body">
        <img className="img-thumbnail" src={event.images.length>0? config.baseUrl+"/"+event.images[0].url:''}></img>
      <h5 className="card-title">{dateString}</h5>
      <h5 className="card-title">{event.type.name}</h5>
      <h5 className="card-title">Total participants: {" "+event.registrations.length}</h5>
      <p className="card-text">{event.details}</p>
    </div>
    {options == 0? <EventOptions event={event} setOptions={setOptions} setPageOptions={setPageOptions} deleteEvent={deleteEvent} setDetails={setDetails}></EventOptions>:''}
    {options == 1? <Register event={event} setOpetions={setOptions} setPageOptions={setPageOptions} setDetails={setDetails}></Register>:''}
    {options == 2? <ViewMembers event={event} details={details} setDetails={setDetails} setEvent={setSelectedEvent} setOptions={setOptions}></ViewMembers>:''}
    {options == 3? <EditEvent submitHandler={editHandler} event={event} types={types} details={details} setDetails={setDetails} setOptions={setOptions}></EditEvent>:''}
  </div>
  
}

export default EventPage