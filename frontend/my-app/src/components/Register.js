import React,{Fragment,useState} from 'react';
import {Link} from 'react-router-dom';

const Register =() => {
    return (
        <Fragment>
        <h1 style={{color:"#D9D9D9",marginTop:"5%",textAlign:"center"}}>Register</h1>
        <div className="container" style={{borderRadius:"3%",marginTop:"10%",margin:"auto",background:"#D9D9D9",maxWidth:"450px",minHeight:"600px"}}>
        <br></br>
        <h2 style={{color:"#284B63",textAlign:"center"}}>Are your registering as an employee or business?</h2>
        <br></br>
        <button id="loginButton" style={{marginTop:"10px" ,width:"40%",border:"0"}} className="btn btn-primary  mx-auto d-block">
        <Link style={{marginTop:"10%",textDecoration:"none",color:"#D9D9D9"}} to="/RegisterEmployee">Employee</Link>
        </button>
        <br></br>
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