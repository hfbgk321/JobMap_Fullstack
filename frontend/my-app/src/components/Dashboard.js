import React,{Fragment,useState,useEffect} from 'react';
import { Route,Redirect, Switch } from 'react-router-dom';


import Dashboardemployee from "./dashboardemployee";
import Dashboardemployer from "./dashboardemployer";

const Dashboard =({setAuth}) => {
    const[user,setUser]=useState({
        firstname:"",
        lastname:"",
        username:"",
        email:"",
        isEmployer:false
    });
    
    useEffect(()=>{
        getUser()
        
        console.log(user.isEmployer)
        console.log(3)
        console.log(1)
    },[])
    async function getUser(){
        try {
            const response = await fetch("http://localhost:5000/dashboard",{
            method:"GET",
            headers:{token:localStorage.token}
        });
        const parseRes=await response.json()
        console.log(parseRes)
        setUser({...user,username:parseRes.user_name,email:parseRes.user_email,firstname:parseRes.first_name,lastname:parseRes.last_name, isEmployer:parseRes.isemployer})
        
    } catch (error) {
            console.error(error.message)
        }
    }
    console.log(user.isEmployer)
    return (
        
        <Fragment>
        <Switch>
            <Route exact path="/dashboard" render={props=>
            !user.isEmployer?
            (<Dashboardemployee {...props} setAuth={setAuth}/>):
            (<Dashboardemployer {...props} setAuth={setAuth}/>)}/>

            {/* <Route exact path="/dashboard/employerds" render={props=>
            user.isEmployer===true?
            (<Dashboardemployer {...props} setAuth={setAuth}/>):
            (<Redirect to ="/dashboard/employeeds"/>)}/> */}
        </Switch>
        </Fragment>
    );
};
export default Dashboard;