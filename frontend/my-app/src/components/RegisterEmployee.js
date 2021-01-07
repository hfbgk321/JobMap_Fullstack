import React,{Fragment,useState} from 'react';
import {Link} from 'react-router-dom';

const RegisterEmployee =({setAuth}) => {
    const [inputs,setInputs]=useState({ //useState=default values 
        //setInputs change values of inputs
        email:"",
        password:"",
        firstname:"",
        lastname:"",
        resume:"",
        employeeaddress:"",
        isEmployer:false,
    });
    
    const {email,password,firstname,lastname,resume,employeeaddress}=inputs;
    const fieldChange=(e)=>{
        setInputs({...inputs,[e.target.name]:e.target.value});
        
    }
    const onSubmitForm= async (e)=>{
    
        e.preventDefault() // prevents refresh on submit
        try {
            const body={email,password,firstname,lastname,resume,employeeaddress};
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
        <form style={{textAlign:"center"}} className="form-signin" onSubmit={onSubmitForm}> 
            <input required id="loginInput"style={{borderColor:"#284B63",outline:"0",borderWidth:"0 0 2px",margin:"auto",width:"70%",background:"transparent",color:"#284B63"}} type="email" name="email" placeholder="Email"  value={email} onChange={e=>fieldChange(e)} className="form-control"/>
            <br></br>
            <input required id="loginInput"style={{borderColor:"#284B63",outline:"0",borderWidth:"0 0 2px",margin:"auto",width:"70%",background:"transparent",color:"#284B63"}} type="text" name="firstname" placeholder="First Name"  value={firstname} onChange={e=>fieldChange(e)} className="form-control"/>
            <br></br>
            <input required id="loginInput"style={{borderColor:"#284B63",outline:"0",borderWidth:"0 0 2px",margin:"auto",width:"70%",background:"transparent",color:"#284B63"}} type="text" name="lastname" placeholder="Last Name"  value={lastname} onChange={e=>fieldChange(e)} className="form-control"/>
            <br></br>
            <input required id="loginInput"style={{borderColor:"#284B63",outline:"0",borderWidth:"0 0 2px",margin:"auto",width:"70%",background:"transparent",color:"#284B63"}} type="password" name="password" placeholder="Password"  value={password} onChange={e=>fieldChange(e)} className="form-control"/>
            <br></br>
            <input  id="loginInput"style={{borderColor:"#284B63",outline:"0",borderWidth:"0 0 2px",margin:"auto",width:"70%",background:"transparent",color:"#284B63"}} type="text" name="employeeaddress" placeholder="Home Address (Optional)"  value={employeeaddress} onChange={e=>fieldChange(e)} className="form-control"/>
            <br></br>
            <h1 style={{fontSize:"17px",color:"#284B63"}}>Upload Your Resume (Optional)</h1>
            <input id="loginInput"style={{borderColor:"#284B63",outline:"0",borderWidth:"0 0 2px",margin:"auto",width:"70%",background:"transparent",color:"#284B63"}} type="file"  name="resume" placeholder="Upload Resume"  value={resume} onChange={e=>fieldChange(e)} className="form-control" accept="image/jpeg, application/pdf, application/msword" />
            <br></br>
            
            <button id="loginButton" style={{width:"70%",border:"0"}} className="btn btn-primary  mx-auto d-block" >Register</button>
            
            </form>
        <br></br>
        <br></br>
        <div style={{textAlign:"center"}}>
        <Link  style={{color:"#284B63"}} to ="/login">Have An Account?</Link>
        </div>
        <h2 style={{fontSize:"20px",color:"#284B63",textAlign:"center",display:"none"}} id="invalidInfo">Email is Already Registered</h2>
        </div>
        </Fragment>
    )
}
export default RegisterEmployee;