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
        <h1 style={{color:"#D9D9D9",marginTop:"5%",textAlign:"center"}}>Register</h1>
        <div className="container" style={{borderRadius:"3%",marginTop:"10%",margin:"auto",background:"#D9D9D9",maxWidth:"450px",minHeight:"600px"}}>
        <br></br>
        <form style={{textAlign:"center"}} className="form-signin" onSubmit={onSubmitForm}> 
            <input id="loginInput"style={{borderColor:"#284B63",outline:"0",borderWidth:"0 0 2px",margin:"auto",width:"70%",background:"transparent",color:"#D9D9D9"}} type="email" name="email" placeholder="email"  value={email} onChange={e=>fieldChange(e)} className="form-control"/>
            <br></br>
            <input id="loginInput"style={{borderColor:"#284B63",outline:"0",borderWidth:"0 0 2px",margin:"auto",width:"70%",background:"transparent",color:"#D9D9D9"}} type="text" name="username" placeholder="Username"  value={username} onChange={e=>fieldChange(e)} className="form-control"/>
            <br></br>
            <input id="loginInput"style={{borderColor:"#284B63",outline:"0",borderWidth:"0 0 2px",margin:"auto",width:"70%",background:"transparent",color:"#D9D9D9"}} type="password" name="password" placeholder="Password"  value={password} onChange={e=>fieldChange(e)} className="form-control"/>
            <br></br>
            <button id="loginButton" style={{width:"70%",border:"0"}} className="btn btn-primary  mx-auto d-block" >Submit</button>
        </form>
        <br></br>
        <br></br>
        <div style={{textAlign:"center"}}>
        <Link  style={{color:"#284B63"}} to ="/login">Have An Account?</Link>
        </div>
        </div>
        </Fragment>
    )
}
export default Register;