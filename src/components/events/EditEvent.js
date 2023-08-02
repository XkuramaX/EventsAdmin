
import { useState } from 'react'
import config from '../../config.json'
import Create from './Create'

function EditEvent({submitHandler, types, details, setDetails, setOptions}) {

    return <>
        <h1>Edit Event</h1>
        {/* <img src={event.images.length>0? config.baseUrl+"/"+event.images[0].url: ''} className="img-thumbnail" alt="..."></img> */}
            <Create submitHandler={submitHandler} details={details} setDetails={setDetails} types={types}></Create>
            <form className="user" onSubmit={submitHandler}>
            <button onClick={()=> {setOptions(0)}} className="btn btn-secondary btn-user btn-block">
                Back
            </button>
            </form>
        </>
        

}

export default EditEvent