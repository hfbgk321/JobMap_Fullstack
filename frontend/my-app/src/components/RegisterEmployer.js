import React,{Fragment,useState} from 'react';
import {Link} from 'react-router-dom';

const RegisterEmployer =({setAuth}) => {
    const [inputs,setInputs]=useState({ //useState=default values 
        //setInputs change values of inputs
        email:"",
        password:"",
        businessname:"",
        employeraddress:"",
        isEmployer:false,
    });
    
    const {email,password,businessname,employeraddress}=inputs;
    
    const fieldChange=(e)=>{
        setInputs({...inputs,[e.target.name]:e.target.value});
        
    }
    const invalidInfo =() =>{
        document.getElementById("invalidInfo").style.display="block";
    }
    const onSubmitForm= async (e)=>{
    
        e.preventDefault() // prevents refresh on submit
        try {
            const body={email,password,businessname,employeraddress};
        
            const response = await fetch("http://localhost:5000/auth/registeremployer",{
            method:"POST",
            headers: { "Content-Type":"application/json" },
            body:JSON.stringify(body)
            });
           
            const parseRes=await response.json()
            
            localStorage.setItem("token",parseRes.token);
            if(!(response.status===401||parseRes==="Missing Credentials"||parseRes==="Invalid Email")){
                setAuth(true)
            }
            
            
        } catch (error) {
            invalidInfo()
            console.error(error.message)
        }
    }
    return (
        <Fragment>
        <h1 style={{color:"#D9D9D9",marginTop:"5%",textAlign:"center"}}>Register</h1>
        <div className="container" style={{borderRadius:"3%",marginTop:"10%",margin:"auto",background:"#D9D9D9",maxWidth:"450px",minHeight:"600px"}}>
        <br></br>
        <form style={{textAlign:"center"}} className="form-signin" onSubmit={onSubmitForm}> 
            <input required id="loginInput"style={{borderColor:"#284B63",outline:"0",borderWidth:"0 0 2px",margin:"auto",width:"70%",background:"transparent",color:"#284B63"}} type="email" name="email" placeholder="Email"  value={email} onChange={e=>fieldChange(e)} className="form-control"/>
            <br></br>
            <input required id="loginInput"style={{borderColor:"#284B63",outline:"0",borderWidth:"0 0 2px",margin:"auto",width:"70%",background:"transparent",color:"#284B63"}} type="password" name="password" placeholder="Password"  value={password} onChange={e=>fieldChange(e)} className="form-control"/>
            <br></br>
            <input required id="loginInput"style={{borderColor:"#284B63",outline:"0",borderWidth:"0 0 2px",margin:"auto",width:"70%",background:"transparent",color:"#284B63"}} type="text" name="businessname" placeholder="Name Of Business"  value={businessname} onChange={e=>fieldChange(e)} className="form-control"/>
            <br></br>
            <input required id="loginInput"style={{borderColor:"#284B63",outline:"0",borderWidth:"0 0 2px",margin:"auto",width:"70%",background:"transparent",color:"#284B63"}} type="text" name="employeraddress" placeholder="Business Address"  value={employeraddress} onChange={e=>fieldChange(e)} className="form-control"/>
            <br></br>
            <button id="loginButton" style={{width:"70%",border:"0"}} className="btn btn-primary  mx-auto d-block" >Register</button>
            </form>
        <br></br>
        
        <div style={{textAlign:"center"}}>
        <Link  style={{color:"#284B63"}} to ="/login">Have An Account?</Link>
        </div>
        <div>
        <h2 style={{fontSize:"20px",color:"#284B63",textAlign:"center",display:"none"}} id="invalidInfo">Email or Business Address is Already Registered</h2>
       
        </div>
        </div>
        </Fragment>
    )
}
export default RegisterEmployer;