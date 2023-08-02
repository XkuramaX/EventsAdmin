import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Create from '../members/Create';

function LoginPage({login, logout}) {
    let [options,setOptions] = useState(0)
    
    return (
        <div className="container">

        <div className="row justify-content-center">

            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div className="col-lg-6">
                                {options == 0? <Login login={login}></Login>:''}
                                {options == 1? <Create setOptions={setOptions}></Create>:''}
                                <div className='row'>
                                    {options != 0? <button className="btn btn-link" onClick={()=>setOptions(0)}>Log in</button>:''}
                                    {options != 1? <button className="btn btn-link" onClick={()=>setOptions(1)}>New User</button>:''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    )
}

export default LoginPage
