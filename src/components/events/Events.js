import React, {useState, useEffect} from 'react'
import config from '../../config.json'
import EventsTableItem from './EventsTableItem'
import Create from './Create'
import EventPage from './EventPage'


function Events() {

    const [events, setEvents] = useState([])
    const [options, setOptions] = useState(0)
    const [details, setDetails] = useState({})
    const [types, setTypes] = useState([])
    const [selectedEvent, setSelectedEvent] = useState("")
    const [eventPageOptions, setEventPageOptions] = useState(0)

    const [members, setMembers] = useState([])

    let key = JSON.parse(localStorage.getItem("apiKey"))

    let url = config.baseUrl+"/api/events"
    let typesUrl = config.baseUrl+"/api/types"
    console.log("akash I am here");
    // let membersUrl = config.baseUrl+"/api/members"

    let fetchData = async(url) =>{
        let response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'include', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              "Authorization": key
            //   'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
        let resp = await response.json()
        return resp
    }

    let postData = async(url) =>{
        let response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'include', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              "Authorization": key
            //   'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(details)
          })
        let resp = await response.json()
        return resp
    }

    let putData = async(url) =>{
        let response = await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'include', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              "Authorization": key
            //   'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(details)
          })
        let resp = await response.json()
        return resp
    }

    let deleteData = async(id) => {
        let response = await fetch(url+"/"+id, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": key
            }
        })
        setEvents(events.filter((event)=>event._id!==id))
    }

    useEffect(()=>{
        fetchData(url+"/all").then(async(response)=>{
            console.log("response",response)
            if (response.success){
                console.log(response.response)
                let resp = response.response
                setEvents(resp)
            } else {
                console.log("unable to fetch data!")
            }
            
        })
    }, [])

    useEffect(()=>{
        fetchData(typesUrl+"/all").then(async(response)=>{
            console.log("response",response)
            if (response.success){
                console.log(response.response)
                setTypes(response.response)
            } else {
                console.log("unable to fetch data!")
            }
            
        })
    }, [])

    let submitHandler = (e) => {
        e.preventDefault();
        console.log("This is here",events)
        postData(url+"/create").then(async(response)=> {
            if(response.success) {
                setEvents([...events,response.response])
                e.target.name.value = null
                e.target.type.value = ""
                e.target.price.value = 0
                e.target.description.value = null
                setDetails({})
                setOptions(0)
            } else {
                console.log(response)
                console.log("Cannot create")
            }
            
        })
    }

    let editHandler = (e) => {
        e.preventDefault();
        console.log("This is here",events)
        putData(url+"/"+selectedEvent._id).then(async(response)=> {
            if(response.success) {
                let newEvents = []
                events.forEach((event) => {
                    if (event._id == selectedEvent._id) {
                        newEvents.push(response.response)
                    } else {
                        newEvents.push(event)
                    }
                })
                setEvents(newEvents)
                setDetails({})
            } else {
                console.log(response)
                console.log("Cannot create")
            }
            fetchData(url+"/all").then(async(response)=>{
                console.log("response",response)
                if (response.success){
                    console.log(response.response)
                    let resp = response.response
                    setEvents(resp)
                    setSelectedEvent(resp.filter((event)=> event._id == selectedEvent._id)[0])
                    setEventPageOptions(0)
                } else {
                    console.log("unable to fetch data!")
                }
                
            })
        })
    }

    return (
        <div className="container-fluid">
                <div className="row">
                    <button className="col-6 btn btn-link" onClick={()=>setOptions(0)}>All Events</button>
                    <button className="col-6 btn btn-link" onClick={()=>setOptions(1)}>Create Event</button>
                </div>
                {options==0? <div className="container" width="100%">{events.map((event) => 
                <EventsTableItem key={event._id} item={event} remove={deleteData} setSelectedEvent={setSelectedEvent} deleteUrl={url} setOptions={setOptions}></EventsTableItem>
                )}</div>:<></>}
                {options==3? <EventPage options={eventPageOptions} setSelectedEvent={setSelectedEvent} setOptions={setEventPageOptions} editHandler={editHandler} event={selectedEvent} deleteEvent={deleteData} setPageOptions={setOptions} types={types} details={details} setDetails={setDetails}></EventPage>:<></>}
                {options==1? <><h1>Create Event</h1><Create submitHandler={submitHandler} setDetails={setDetails} details={details} types={types}></Create></>:<></>}   
                
        </div>)
}

export default Events