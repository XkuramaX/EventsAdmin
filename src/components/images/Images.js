import React, {useEffect, useState, useRef} from 'react'
import config from '../../config.json'
import ImagesTableItem from './imagesTableItem'

function Images() {
    const [images, setimages] = useState([])
    const [details, setDetails] = useState({
        url: "",
    })
    let form = useRef(null)
    let key = JSON.parse(localStorage.getItem("apiKey"))

    let url = config.baseUrl+"/api/images"

    let formData = new FormData()

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
    
    let postData = async(url, formData) =>{
        console.log(formData)
        let response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'include', // include, *same-origin, omit
            headers: {
            //   'Content-Type': 'multipart/form-data',
              "Authorization": key
            //   'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
          })
        let resp = await response.json()
        return resp
    }

    let deleteData = async(url) => {
        let response = await fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": key
            }
        })
    }

    useEffect(()=>{
        fetchData(url+"/all").then(async(response)=>{
            console.log("response",response)
            if (response.success){
                console.log(response.response)
                setimages(response.response)
            } else {
                console.log("unable to fetch data!")
            }
            
        })
    }, [])

   

    async function deleteItem(item) {
        deleteData(url+"/"+item._id).then( ()=>{
            setimages(images.filter((category)=> category._id !== item._id))
            console.log("Delete is being called!", item._id
            )})
    }

    let submitHandler = (e) => {
        // console.log("current form:",e.target.imgFIle)
        let formData = new FormData(e.target)
        e.target.imgFile.value = null
        // console.log(formData, "here is the form")
        e.preventDefault();
        console.log("This is here",details)
        postData(url+"/create", formData).then(async(response)=> {
            if(response.success) {
                setimages([response.response])
            } else {
                console.log(response)
                console.log("Cannot create")
            }
            
        })
        
        console.log(details)
    }

    const handleImageUpload = event => {
        console.log("inside onChange!")
        const files = event.target.files
        console.log(files[0])
        const formData = new FormData()
        formData.append('imgFile', files[0])
      }

    return (
        <div className="container-fluid">
                    <h1 className="h3 mb-2 text-gray-800 heading">Upload the menu card in .pdf format</h1>

                    <form className="user" ref={form} onSubmit={submitHandler}>
                        <div className="form-group">
                            <input type="file" name="imgFile" className="form-control-user"
                                id="exampleInputEmail" aria-describedby="emailHelp" onChange={event => handleImageUpload(event)}
                                placeholder="Enter Service Name..." required></input>
                        </div>
                        <button type="submit" onSubmit={submitHandler} className="btn btn-primary btn-user btn-block">
                            Upload
                        </button>
                    </form>

                    <h1 className="h3 mb-2 text-gray-800 heading">Menu</h1>

                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Current</h6>
                        </div>
                        <div className="card-body">
                                <table cellspacing="0">
                                    {/* <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                     */}
                                        {images.map((item)=>(
                                            <ImagesTableItem key={item._id} item={item} remove={deleteItem}></ImagesTableItem>
                                        ))}
                                </table>
                        </div>
                    </div>
        </div>)
}

export default Images
