import React,{Fragment,useState} from 'react';
import {Link} from 'react-router-dom';

const Login =({setAuth}) => {
    const[inputs,setInputs]=useState({
        email:"",
        password:"",
    });
    const{email,password}=inputs;
    const fieldChange=(e)=>{
        setInputs({...inputs,[e.target.name]:e.target.value});
    }
    const onLogin= async(e)=>{
        e.preventDefault()
        try {
            const body={email,password};
            const response = await fetch("http://localhost:5000/auth/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });
            const parseRes=await response.json()
            
            localStorage.setItem("token",parseRes.token)
            
            if(!(response.status===401||parseRes==="Missing Credentials"||parseRes==="Invalid Email")){
                setAuth(true)
            }
            else{
                invalidInfo()
            }
            
        } catch (error) {
            console.error(error.message)
        }
    }
    const invalidInfo =() =>{
        document.getElementById("invalidInfo").style.display="block";
    }
    return (
        

        <Fragment>
        <h1 style={{textAlign:"center"}}> Login</h1>
        
        
        <form onSubmit={onLogin}>
            <input name="email" value={email} type="email" placeholder="Email" onChange={e=>fieldChange(e)} className="form-control"></input>
            <br></br>
            <input name="password" value={password} type="password" placeholder="Password" onChange={e=>fieldChange(e)} className="form-control"></input>
            <br></br>
            <button className="btn btn-primary  mx-auto d-block" >Submit</button>
        </form>
        <br></br>
        <Link to="/register">Register</Link>
        <h1 id="invalidInfo"style={{display:"none"}}>Invalid Credentials</h1>
        </Fragment>
        
    );
};
export default  Login;