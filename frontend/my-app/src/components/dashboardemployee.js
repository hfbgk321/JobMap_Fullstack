import React,{Fragment,useState,useEffect} from 'react';
import GoogleApiWrapper from './googlemapsemployee'

const Dashboardemployee =({setAuth}) => {
    const[user,setUser]=useState({
        firstname:"",
        lastname:"",
        username:"",
        email:"",
        isEmployer:false
    });
    useEffect(()=>{
        getUser();
    },[])
    const logout =(e) =>{
        e.preventDefault()
        localStorage.removeItem("token");
        setAuth(false)
    }
    async function getUser(){
        try {
            const response = await fetch("http://localhost:5000/dashboard",{
            method:"GET",
            headers:{token:localStorage.token}
        });
        const parseRes=await response.json()

        setUser({...user,username:parseRes.user_name,email:parseRes.user_email,firstname:parseRes.first_name,lastname:parseRes.last_name, isEmployer:parseRes.isEmployer})
        
    } catch (error) {
            console.error(error.message)
        }
    }
    return (
        <Fragment>
        <h1 style={{textAlign:"center"}}>Dashboard employee</h1>
        <h1 style={{textAlign:"center"}}>{user.username}</h1>
        <h1 style={{textAlign:"center"}}>{user.firstname}</h1>
        <h1 style={{textAlign:"center"}}>{user.lastname}</h1>
        <h1 style={{textAlign:"center"}}>{user.email}</h1>
        <button  className="btn btn-primary mx-auto d-block" onClick={ (e) =>logout(e)}>Log Out</button>
        <div style={{display:"block",margin:"auto"}}>
        <GoogleApiWrapper  ></GoogleApiWrapper>
        </div>
        </Fragment>
    );
};
export default Dashboardemployee;