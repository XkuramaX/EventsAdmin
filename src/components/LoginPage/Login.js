import React, {useState} from 'react'

function Login({login})  {
    let [details, setDetails] = useState({ userName: "", password: ""})
    let loginSubmitHandler = (e) => {
        e.preventDefault();
        login(details)
    }
    return <div className="p-5">
    <div className="text-center">
        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
    </div>
    <form className="user" onSubmit={loginSubmitHandler}>
        <div className="form-group">
            <input type="text" name="userName" className="form-control form-control-user"
                id="exampleInputEmail" aria-describedby="emailHelp" onChange={e => {setDetails({...details, userName: e.target.value})}}
                value={details.username}
                placeholder="Enter username..." required></input>
        </div>
        <div className="form-group">
            <input type="password" name="password" className="form-control form-control-user" onChange={e => {setDetails({...details, password: e.target.value})}}
                value={details.password}
                id="exampleInputPassword" placeholder="Password"></input>
        </div>
        <button type="submit" onSubmit={loginSubmitHandler} className="btn btn-primary btn-user btn-block">
            Login
        </button>
    </form>
</div>
}

export default Login