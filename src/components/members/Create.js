import React, {useState, useEffect} from 'react'
import config from '../../config.json'

function Create({setOptions}) {
    let BaseUrl = config.baseUrl + "/api/members"
    let key = JSON.parse(localStorage.getItem("apiKey"))

    const [details, setDetails] = useState({})

    let submitHandler = (e) => {
        e.preventDefault();
        console.log(details)
        Signup(details)
    }

    let Signup = async (details) => {
        let url = config.baseUrl+"/api/members/create"
        console.log(url);
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          // credentials: 'include', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(details)
        })
        let body = await response.json()
        if (body.success) {
          console.log("Success")
          console.log("details", details)
          console.log(details.username)
          console.log(body.response)
          setOptions(0)
        } else {
          console.log(body)
        }
    }

    return (
        
            <div className="p-5">
                <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Register!</h1>
                </div>
                <form className="user" onSubmit={submitHandler}>
                    <div className="form-group">
                        <input type="text" name="firstName" className="form-control form-control-user"
                            id="exampleInputEmail" aria-describedby="emailHelp" onChange={e => {setDetails({...details, firstName: e.target.value})}}
                            value={details.username}
                            placeholder="Enter first name..." required></input>
                    </div>
                    <div className="form-group">
                        <input type="text" name="lastName" className="form-control form-control-user"
                            id="exampleInputEmail" aria-describedby="emailHelp" onChange={e => {setDetails({...details, lastName: e.target.value})}}
                            value={details.username}
                            placeholder="Enter last name..." required></input>
                    </div>
                    <div className="form-group">
                        <input type="text" name="userName" className="form-control form-control-user"
                            id="exampleInputEmail" aria-describedby="emailHelp" onChange={e => {setDetails({...details, userName: e.target.value})}}
                            value={details.username}
                            placeholder="Enter username..." required></input>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control form-control-user" onChange={e => {setDetails({...details, password: e.target.value})}}
                            value={details.password}
                            id="exampleInputPassword" placeholder="Password..."></input>
                    </div>
                    <div className="form-group">
                        <input type="number" name="phoneNumber" className="form-control form-control-user" onChange={e => {setDetails({...details, phoneNumber: e.target.value})}}
                            value={details.phoneNumber}
                            id="exampleInputPassword" placeholder="Phone number"></input>
                    </div>
                    <div className="form-group">
                        <input type="number" name="batch" className="form-control form-control-user" onChange={e => {setDetails({...details, batch: e.target.value})}}
                            value={details.batch}
                            id="exampleInputPassword" placeholder="Batch"></input>
                    </div>
                    <div className="form-group">
                        <input type="text" name="position" className="form-control form-control-user" onChange={e => {setDetails({...details, position: e.target.value})}}
                            value={details.position}
                            id="exampleInputPassword" placeholder="Position"></input>
                    </div>
                    <div className="form-group">
                        <input type="text" name="description" className="form-control form-control-user" onChange={e => {setDetails({...details, description: e.target.value})}}
                            value={details.description}
                            id="exampleInputPassword" placeholder="Last Year's team or other details"></input>
                    </div>
                    <button type="submit" className="btn btn-primary btn-user btn-block">
                        Create
                    </button>
                </form>
            </div>
    )
}
export default Create