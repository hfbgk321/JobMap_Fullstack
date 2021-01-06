import React, {Fragment,useState,useEffect} from 'react';

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  function setAuth(boolean){
    setUserAuthenticated(boolean);
  }
  async function isAuth(){
    try {
      const response=await fetch("http://localhost:5000/auth/verifylogin",{
        method:"GET",
        headers:{token:localStorage.token}
      });
      const parseRes=await response.json()
      if(parseRes===true){
        setAuth(true)
      }
      else{
        setAuth(false)
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(()=>{
    isAuth()
  }
  )

  return (
    <Fragment>
      <Router>
      <div className="container">
        <Switch>
          <Route exact path="/login" render = {props =>  
            !userAuthenticated? (<Login {...props} setAuth={setAuth}/>) : (<Redirect to ="/dashboard"/>)
           }
          />
          <Route exact path="/register" render = {props =>
            !userAuthenticated?(<Register {...props} setAuth={setAuth}/>):(<Redirect to="/dashboard"/>)
            }
          />
          <Route exact path="/dashboard" render = {props =>
          userAuthenticated?
          (<Dashboard {...props} setAuth={setAuth}/>):
          (<Redirect to="/login"/>)
          }/>
        </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
