import React,{Fragment,useState} from 'react';
import {Link} from 'react-router-dom';

const Register =({setAuth}) => {
    const [inputs,setInputs]=useState({ //useState=default values 
        //setInputs change values of inputs
        email:"",
        password:"",
        username:"",
        isEmployer:false,
    });
    
    const {email,password,username,isEmployer}=inputs;
    const employerToggle=(e)=>{
        setInputs({...inputs,isEmployer:e.target.checked});
        console.log(inputs.isEmployer);
        
    }
    const fieldChange=(e)=>{
        setInputs({...inputs,[e.target.name]:e.target.value});
        
    }
    const onSubmitForm= async (e)=>{
    
        e.preventDefault() // prevents refresh on submit
        try {
            const body={email,password,username};
            const response = await fetch("http://localhost:5000/auth/registeremployee",{
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
        <h1 style={{color:"#D9D9D9",marginTop:"5%",textAlign:"center"}}>Register</h1>
        <div className="container" style={{borderRadius:"3%",marginTop:"10%",margin:"auto",background:"#D9D9D9",maxWidth:"450px",minHeight:"600px"}}>
        <br></br>
        <h2 style={{color:"#284B63",textAlign:"center"}}>Are your registering as an employee or business?</h2>
        <button id="loginButton" style={{marginTop:"10px" ,width:"40%",border:"0"}} className="btn btn-primary  mx-auto d-block">
        <Link style={{marginTop:"10%",textDecoration:"none",color:"#D9D9D9"}} to="/RegisterEmployee">Employee</Link>
        </button>
        <button id="loginButton" style={{marginTop:"10px" ,width:"40%",border:"0"}} className="btn btn-primary  mx-auto d-block">
        <Link style={{textDecoration:"none",color:"#D9D9D9"}} to="/RegisterEmployer">Business</Link>
        </button>
        <br></br>
        <div style={{textAlign:"center"}}>
        <Link  style={{color:"#284B63"}} to ="/login">Have An Account?</Link>
        </div>
        </div>
        </Fragment>
    )
}
export default Register;