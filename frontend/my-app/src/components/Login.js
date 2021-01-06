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
        <h1 style={{color:"#D9D9D9",marginTop:"5%",textAlign:"center"}}>Job Map</h1>
        <div className="container" style={{borderRadius:"3%",marginTop:"10%",margin:"auto",background:"#D9D9D9",maxWidth:"450px",minHeight:"600px"}}>
        <br></br>
        <h2 style={{color:"#284B63",textAlign:"center"}}> Welcome</h2>
        <br></br>
        
        <form style={{textAlign:"center"}}className="form-signin" onSubmit={onLogin}>
            <input id="loginInput"style={{borderColor:"#284B63",outline:"0",borderWidth:"0 0 2px",margin:"auto",width:"70%",background:"transparent",color:"#D9D9D9"}} name="email" value={email} type="email" placeholder="Email" onChange={e=>fieldChange(e)} ></input>
            <br></br>
            <br></br>
            <input id="loginInput"style={{borderColor:"#284B63",outline:"0",borderWidth:"0 0 2px",margin:"auto",width:"70%",background:"transparent",color:"#D9D9D9"}} name="password" value={password} type="password" placeholder="Password" onChange={e=>fieldChange(e)} ></input>
            <br></br>
            <br></br>
            <button id="loginButton" style={{width:"70%",border:"0"}} className="btn btn-primary  mx-auto d-block" >Login</button>
        </form>
        <h3 style={{ width: "70%", textAlign:"center", borderBottom: "1px solid #284B63", lineHeight: "0.1em" ,margin: "10px auto 20px"}}><span style={{textAlign:"center",background:"#D9D9D9", padding:"0 10px", fontSize:"20px",color:"#284B63"}}>or</span></h3>
        <button id="loginButton" style={{marginTop:"10px" ,width:"70%",border:"0"}} className="btn btn-primary  mx-auto d-block">
        <Link style={{textDecoration:"none",color:"#D9D9D9"}} to="/register">Create New Account</Link>
        </button>
        <br></br>
        <div style={{textAlign:"center"}}>
        <Link style={{color:"#284B63"}} to="/register">Forget Password</Link>
        </div>
        <h1 id="invalidInfo"style={{display:"none"}}>Invalid Credentials</h1>
        
        </div>
        </Fragment>
        
    );
};
export default  Login;