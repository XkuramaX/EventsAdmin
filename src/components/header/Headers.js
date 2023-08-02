import React, {useState, useEffect} from 'react'
import HeaderTableItem from './HeaderTableItem'
import config from '../../config.json'

function Headers() {
    const [headers, setheaders] = useState([])
    const [details, setDetails] = useState({
        name: "",
    })

    let key = JSON.parse(localStorage.getItem("apiKey"))

    let url = config.baseUrl+"/api/header"

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
                setheaders(response.response)
            } else {
                console.log("unable to fetch data!")
            }
            
        })
    },[details])

    // useEffect(()=>{
    //     fetchData(typeUrl+"/all").then(async(response)=>{
    //         console.log("response all types",response)
    //         if (response.success){
    //             console.log(response.response)
    //             setTypes(response.response)
    //         } else {
    //             console.log("unable to fetch data!")
    //         }
            
    //     })
    // },[])

    async function deleteItem(item) {
        deleteData(url+"/"+item._id).then( ()=>{
            setheaders(headers.filter((category)=> category._id !== item._id))
            console.log("Delete is being called!", item._id
            )})
    }

    let submitHandler = (e) => {
        e.preventDefault();
        console.log("This is here",details)
        postData(url+"/create").then(async(response)=> {
            if(response.success) {
                setheaders([...headers,details])
                e.target.name.value = null
            } else {
                console.log(response)
                console.log("Cannot create")
            }
            
        })
        
        console.log(details)
    }

    return (
        <div className="container-fluid">
                    <h1 className="h3 mb-2 text-gray-800 heading">Add a Header</h1>

                    <form className="user" onSubmit={submitHandler}>
                        <div className="form-group">
                            <input type="text" name="name" className="form-control form-control-user"
                                id="exampleInputEmail" aria-describedby="emailHelp" onChange={e => {setDetails({...details, name: e.target.value})}}
                                value={details.name}
                                placeholder="Enter Service Name..." required></input>
                        </div>
                        <button type="submit" onSubmit={submitHandler} className="btn btn-primary btn-user btn-block">
                            Create
                        </button>
                    </form>

                    <h1 className="h3 mb-2 text-gray-800 heading">Headers</h1>

                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">All Headers</h6>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {headers.map((item)=>(
                                            <HeaderTableItem key={item._id} item={item} remove={deleteItem}></HeaderTableItem>
                                        ))}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
        </div>)
}

export default Headers
