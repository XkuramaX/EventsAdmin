import React from 'react'
import config from '../../config.json'

function MembersTableItem({item, remove, accept}) {
    console.log(item)
    return (
        // <tr>
        //     <td>{item.first_name+" "+item.last_name}</td>
        //     <td>{item.email}</td>
        //     <td>{item.address}</td>
        //     <td>{item.phone_number}</td>
        //     <td><ul>{item.requirements.map((requirement) => (
        //         <li>{requirement.name}</li>
        //     ))}</ul></td>
        //     <td>{item.description}</td>
        //     <td><button className="btn btn-success" onClick={()=>{accept(item)}}>Accept</button>
        //     <button className="btn btn-danger" onClick={()=>{remove(item)}}>Delete</button>
        //     </td>
        // </tr>
        <div className="card">
            <div className="card-body row">
                <div className="col-2">
                    <p><strong>Name</strong> : {item.firstName + " " + item.lastName}</p> 
                </div>
                <div className="col-2">
                    <p><strong>Email</strong> : {item.email}</p> 
                </div>
                <div className="col-2">
                    <p><strong>Phone</strong> : {item.phoneNumber}</p> 
                </div>
                <div className="col-2">
                    <p><strong>batch</strong> : {item.batch}</p> 
                </div>
                <div className="col-4">
                    {accept?<button className="btn btn-success" onClick={()=>{accept(item)}}>Accept</button>:""}
                    <button className="btn btn-danger" onClick={()=>{remove(item)}}>Delete</button>
                </div>
            </div>
            <div className="card-body row">
                <div className="col-2">
                    <p><strong>Photo</strong> : {item.image}</p> 
                </div>
                <div className="col-2">
                    <p><strong>Position</strong> : {item.position}</p> 
                </div>
            </div>
        </div>
        
    )
}

export default MembersTableItem
