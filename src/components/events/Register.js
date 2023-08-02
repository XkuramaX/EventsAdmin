import { useRef, useState } from "react";
import config from '../../config.json'

function Register ({event, setEvent}) {
    console.log("i am here")
    let form2 = useRef(null)
    let user = JSON.parse(localStorage.getItem("user"));
    const [details, setDetails] = useState({});
    const [image, setImage] = useState();
    
    
    const handleImageUpload = event => {
        console.log("inside onChange!")
        const files = event.target.files
        console.log(files[0])
        const formData = new FormData()
        formData.append('imgFile', files[0])
      }
    
    
    let imageUrl = config.baseUrl+"/api/images"
    
    
    let imageSubmitHandler = (e) => {
        console.log("current form:",e.target.imgFIle)
        let formData = new FormData(e.target)
        e.target.imgFile.value = null
        // console.log(formData, "here is the form")
        e.preventDefault();
        console.log("This is here",details)
        postImageData(imageUrl+"/create", formData).then(async(response)=> {
            console.log("akashaki ::", response)
            if(response.success) {
                console.log("response");
                setImage(response.response._id)
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

    let transactionUrl = config.baseUrl+"/api/transactions"
    let eventUrl = config.baseUrl + "/api/events"

    let submitHandler = async(e) => {
        e.preventDefault()
        let data = {
            member: user.id,
            image: image
        }
        let response = await fetch(transactionUrl+"/create", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'include', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              "Authorization": JSON.parse(user.accesstoken)
            //   'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        })
        response = await response.json();
        if (response.success) {
            const registration = {
                member: user.id,
                transaction: response.response._id,
                confirm: false
            }
            let registrations = []
            event.registrations.forEach((registration)=> {
                registrations.push(registration)
            })
            registrations.push(registration)
            data = {
                registrations: registrations
            }
            response = await fetch(eventUrl+"/"+event._id, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": JSON.parse(user.accesstoken)
                //   'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data)
            })
            response = await response.json();
            console.log("registration:", response)
            window.location.href = "/events"
        }
    }


    return <>
        <br></br>
        <h4>Please pay {event.price} in the below UPI link and attach screenshot to register</h4>
        <h3><a href={"upi://pay?pa="+event.upiId}>{event.upiId}</a></h3>
        <form className="user" ref={form2} onSubmit={imageSubmitHandler}>
                        <div className="form-group">
                            <input type="file" name="imgFile" className="form-control-user"
                                id="exampleInputEmail" aria-describedby="emailHelp" onChange={event => handleImageUpload(event)}
                                placeholder="Enter Service Name..." required></input>
                        </div>
                        <button type="submit" onSubmit={imageSubmitHandler} className="btn btn-primary btn-user btn-block">
                            Upload Image
                        </button>
        </form>
        <form className="user2"  onSubmit={submitHandler}>
                        <button type="submit" onSubmit={submitHandler} className="btn btn-primary btn-user btn-block">
                            Submit
                        </button>
        </form>
    </>


}

export default Register