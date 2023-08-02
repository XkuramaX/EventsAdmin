import React, {useState, useEffect, useRef} from 'react'

import config from '../../config.json'

function Create({submitHandler, setDetails, details, types}) {
    const user = JSON.parse(localStorage.getItem("user"))
    let form = useRef(null);
    const handleImageUpload = event => {
        console.log("inside onChange!")
        const files = event.target.files
        console.log(files[0])
        const formData = new FormData()
        formData.append('imgFile', files[0])
      }
    let imageUrl = config.baseUrl+"/api/images"
      let imageSubmitHandler = (e) => {
        // console.log("current form:",e.target.imgFIle)
        let formData = new FormData(e.target)
        e.target.imgFile.value = null
        // console.log(formData, "here is the form")
        e.preventDefault();
        console.log("This is here",details)
        postImageData(imageUrl+"/create", formData).then(async(response)=> {
            console.log("akashaki ::", response)
            if(response.success) {
                setDetails({...details,images: [response.response._id]});
            } else {
                console.log(response)
                console.log("Cannot create")
            }
        })
        
       
    }

    let postImageData = async(url, formData) =>{
        console.log(formData)
        let response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'include', // include, *same-origin, omit
            headers: {
            //   'Content-Type': 'multipart/form-data',
              "Authorization": JSON.parse(user.accesstoken)
            //   'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
          })
        let resp = await response.json()
        return resp
    }
    
    return <>
    
    <form className="user" ref={form} onSubmit={imageSubmitHandler}>
                        <div className="form-group">
                            <input type="file" name="imgFile" className="form-control-user"
                                id="exampleInputEmail" aria-describedby="emailHelp" onChange={event => handleImageUpload(event)}
                                placeholder="Enter Service Name..." required></input>
                        </div>
                        <button type="submit" onSubmit={imageSubmitHandler} className="btn btn-primary btn-user btn-block">
                            Upload
                        </button>
        </form>
    <form className="user" onSubmit={submitHandler}>
                        <div className="form-group">
                            <input type="text" name="name" className="form-control form-control-user"
                                id="exampleInputEmail" aria-describedby="emailHelp" onChange={e => {setDetails({...details, name: e.target.value})}}
                                value={details.name}
                                placeholder="Enter Item Name..." required></input>
                        </div>
                        <div className="form-group">
                            <select type="text" name="type" className="form-control" onChange={e => {setDetails({...details, type: e.target.value})}} placeholder="Select..." >
                                    <option value="" default>None</option>
                                    {types.map((type)=> (
                                        <option value={type._id}>{type.name}</option>    
                                    ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="date" name="date" className="form-control form-control-user"
                                id="exampleInputEmail" aria-describedby="emailHelp" onChange={e => {setDetails({...details, date: e.target.value})}}
                                value={details.date}
                                placeholder="Select Date" required></input>
                        </div>
                        <div className="form-group">
                            <textarea type="text" name="description" className="form-control form-control-user" 
                                id="exampleInputEmail" aria-describedby="emailHelp" onChange={e => {setDetails({...details, details: e.target.value})}}
                                value={details.description}
                                placeholder="Enter event Description..." required></textarea>
                        </div>
                        <div className="form-group">
                            <input type="number" name="price" className="form-control form-control-user"
                                id="exampleInputEmail" aria-describedby="emailHelp" onChange={e => {setDetails({...details, price: e.target.value})}}
                                value={details.price}
                                placeholder="Enter Registration Fee..." required></input>
                        </div>
                        <div className="form-group">
                            <input type="text" name="upiId" className="form-control form-control-user"
                                id="exampleInputEmail" aria-describedby="emailHelp" onChange={e => {setDetails({...details, upiId: e.target.value})}}
                                value={details.upiId}
                                placeholder="Enter upi Id..." required></input>
                        </div>
                        <button type="submit" onSubmit={submitHandler} className="btn btn-primary btn-user btn-block">
                            Create
                         </button>
    </form>
    </>
}

export default Create