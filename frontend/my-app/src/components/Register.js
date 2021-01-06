import React,{Fragment,useState} from 'react';
import {Link} from 'react-router-dom';

const Register =({setAuth}) => {
    const [inputs,setInputs]=useState({ //useState=default values 
        //setInputs change values of inputs
        email:"",
        password:"",
        username:""
    });
    const {email,password,username}=inputs;
    const fieldChange=(e)=>{
        setInputs({...inputs,[e.target.name]:e.target.value});
    }
    const onSubmitForm= async (e)=>{
    
        e.preventDefault() // prevents refresh on submit
        try {
            const body={email,password,username};
            const response = await fetch("http://localhost:5000/auth/register",{
            method:"POST",
            headers: { "Content-Type":"application/json" },
            body:JSON.stringify(body)
            });
            const parseRes=await response.json()
            console.log(parseRes);
            localStorage.setItem("token",parseRes.token);
            if(!(response.status===401||parseRes==="Missing Credentials"||parseRes==="Invalid Email")){
                setAuth(true)
            }
            
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
        <Fragment>
        <h1 className="text-center">Register</h1>
        
        <form onSubmit={onSubmitForm}> 
            <input type="email" name="email" placeholder="email"  value={email} onChange={e=>fieldChange(e)} className="form-control"/>
            <br></br>
            <input type="text" name="username" placeholder="Username"  value={username} onChange={e=>fieldChange(e)} className="form-control"/>
            <br></br>
            <input type="password" name="password" placeholder="Password"  value={password} onChange={e=>fieldChange(e)} className="form-control"/>
            <br></br>
            <button className="btn btn-primary form-control" style={{background:"green"}}>Submit</button>
        </form>
        <Link to ="/login">Login</Link>
        </Fragment>
    )
}
export default Register;