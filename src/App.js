import Nav from './components/nav/Nav';
import './App.css';
import './css/sb-admin-2.css'
import './css/sb-admin-2.min.css'
import Home from './components/home/Home';
import Members from './components/members/Members';
import Create from './components/members/Create';
// import Categories from './components/categories/Categories';
import Images from './components/images/Images';
import Types from './components/types/Types';
// import Headers from './components/header/Headers';
import LoginPage from './components/LoginPage/LoginPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import config from './config.json'
import { useState } from 'react';
import Events from './components/events/Events';
import Profile from './components/members/Profile';

function App() {

  const [user, setUser] = useState({
    accesstoken: localStorage.getItem("apiKey"),
    isAdmin: false,
    isSuper: false,
    id: ""
  })

  let Login = async (details) => {
    let url = config.baseUrl+"/api/members/login"
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
      setUser({
        accesstoken: JSON.stringify(body.response),
        isAdmin: body.isAdmin,
        isSuper: body.isSuper,
        id: body.id
      })
      console.log("body", body);
      console.log(user)
      localStorage.setItem("apiKey", JSON.stringify(body.response))
      localStorage.setItem("user", JSON.stringify({
        accesstoken: JSON.stringify(body.response),
        isAdmin: body.isAdmin,
        isSuper: body.isSuper,
        id: body.id
      }))
      console.log(localStorage.getItem("apiKey"))
    } else {
      console.log(body)
    }
  }

  let Logout = () => {
    console.log("Log out")
    localStorage.removeItem("apiKey")
    localStorage.removeItem("user")
    console.log(localStorage.getItem("apiKey"))
    setUser({
      accesstoken: "",
      username: ""
    }
    )
    
  }

  return (
    <div id="wrapper">
      {
        user.accesstoken? (<Router>
          <Nav Logout={Logout}></Nav>
          <div className="d-flex flex-column" id="content-wrapper">

              <div id="content">
                <Switch>
                  <Route path='/' exact component={Home}></Route>
                  <Route path='/members' exact component={Members}></Route>
                  <Route path="/images" exact component={Images}></Route>
                  <Route path="/events" exact component={Events} ></Route>
                  <Route path="/profile" exact component={Profile}></Route>
                  {/*<Route path="/categories" exact component={Categories}></Route>*/}
                  <Route path="/types" exact component={Types}></Route> 
                </Switch>
              </div>

          </div>
          
      </Router>) : <LoginPage login={Login} logout={Logout}></LoginPage>
      }
      
      
    </div>
  );
}

export default App;
