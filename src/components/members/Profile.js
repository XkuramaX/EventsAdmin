import React, {useState, useEffect, useRef} from 'react';
import config from '../../config.json'

function Profile() {
    let user = JSON.parse(localStorage.getItem("user"))
    console.log("user: ", user.accesstoken)
    const [member, setMember] = useState({})
    let MembersUrl = config.baseUrl+"/api/members";
    console.log("akash")
    let imageUrl = config.baseUrl+"/api/images";
    let form = useRef(null);
    const [details, setDetails] = useState({
        url: "",
    })
    const [editForm, setEditForm] = useState()

    let fetchData = async(url) =>{
        let response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'include', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              "Authorization": JSON.parse(user.accesstoken)
            //   'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
        let resp = await response.json()
        return resp
    }

    let editData = async(url, editForm) =>{
        let response = await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'include', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              "Authorization": JSON.parse(user.accesstoken)
            //   'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(editForm)
          })
        let resp = await response.json()
        if (resp.success)
            setMember(resp.response)
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

    useEffect(()=>{
            fetchData(MembersUrl+"/"+user.id).then((response)=>{
                console.log(response);
                if (response.success) {

                    let resp = response.response;

                    console.log("success",response)
                    setMember(response.response)

            } else {
                console.log(response)
            } 
        })
    }, [])

    let imageSubmitHandler = (e) => {
        // console.log("current form:",e.target.imgFIle)
        let formData = new FormData(e.target)
        e.target.imgFile.value = null
        // console.log(formData, "here is the form")
        e.preventDefault();
        console.log("This is here",details)
        postImageData(imageUrl+"/create", formData).then(async(response)=> {
            if(response.success) {
                setDetails(response.response);
                console.log(response);
                editData(MembersUrl+"/"+user.id, {image: response.response._id})
            } else {
                console.log(response)
                console.log("Cannot create")
            }
            
        })
        
       
    }

    const handleImageUpload = event => {
        console.log("inside onChange!")
        const files = event.target.files
        console.log(files[0])
        const formData = new FormData()
        formData.append('imgFile', files[0])
      }

    return <div className="container-fluid">

    <h1 className="h3 mb-2 text-gray-800 heading">{member.firstName+" "+member.lastName}</h1>

    <div className="card shadow mb-4">
        <img src={member.image? config.baseUrl+"/"+member.image.url: ''} className="img-fluid" alt="..."></img>
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
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Username: {member.userName}</h6>
        </div>
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Phone number: {member.phoneNumber}</h6>
        </div>
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Batch: {member.batch}</h6>
        </div>
    </div>

</div>
}
export default Profile