import React from 'react'
// import { config } from 'webpack'
import config from '../../config.json'
import EventPage from './EventPage'

function TableItem({item, remove, url, setSelectedEvent, setOptions}) {
    console.log("here", item)
    return (
        // <tr>
        //     <td>{item.name}</td>
        //     <td>{item.description? item.description: ""}</td>
        //     <td>{item.type?item.type.name:""}</td>
        //     <td>{item.price}</td>
        //     <td><button className="btn btn-danger" onClick={()=>{remove(url+"/"+item._id)}}>Delete</button>
        //     </td>
        // </tr>
        <div className="card">
        <img src={item.images.length>0?config.baseUrl + "/" + item.images[0].url: ""} className="img-thumbnail" alt="..."></img>
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <h6 className="card-text">{item.date}</h6>
          <h6 className="card-text">{item.type.name}</h6>
          <h6 className="card-text">Total participants: {item.registrations.length}</h6>
          <p className="card-text">{item.details}</p>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{setSelectedEvent(item); setOptions(3)}}>
  View Event
</button>
        </div>
      </div>
    )
}

export default TableItem