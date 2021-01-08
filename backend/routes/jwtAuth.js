const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwtGenerator=require("../utils/jwtGenerator");
const validInfo = require("../middleware/validCred");
const authorize = require("../middleware/authorization");
const axios = require("axios");
const API_KEY=process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
router.post("/registeremployee", validInfo,async (req,res) =>{
    try {
        
        const {email,password,firstname,lastname,employeeaddress } = req.body;
        var user_email = await pool.query("SELECT * FROM employeeusers WHERE user_email = $1", [
            email
          ]);
        if(user_email.rows.length!==0){
            return res.status(401).send("Email Already Registered")
        }
        user_email = await pool.query("SELECT * FROM employer WHERE user_email = $1", [
            email
          ]);
        if(user_email.rows.length!==0){
            return res.status(401).send("Email Already Registered")
        }
        const saltRound=10; //how many encryption cycles
        const salt=await bcrypt.genSalt(saltRound);   //process encryptions
        const bcryptPw=await bcrypt.hash(password,salt);  //bcrypt
        
        const newUser = await pool.query("INSERT INTO employeeusers (first_name,last_name,user_email,user_password,user_address) VALUES ($1,$2,$3,$4,$5) RETURNING *",
        [firstname,lastname,email,bcryptPw,employeeaddress]
        );

        const token=jwtGenerator(newUser.rows[0].user_id);
        return res.json({token});
        

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
router.post("/registeremployer", validInfo,async (req,res) =>{
    
    try {
             
        const {email,password,businessname,employeraddress} = req.body;
        const promise= await axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
                  params:{
                      address:employeraddress,
                      key:API_KEY
                  }
              });
        
        const loc=promise.data
        const coords=loc.results[0].geometry.location
        console.log(coords)
        
        var user_email = await pool.query("SELECT * FROM employer WHERE user_email = $1", [
            email
          ]);
        const employer_address= await pool.query("SELECT * FROM employer WHERE user_address = $1", [
            employeraddress
          ]);
        
        if(user_email.rows.length!==0){
            return res.status(401).send("Email Already Registered")
        }
        user_email=await pool.query("SELECT * FROM employeeusers WHERE user_email = $1", [
            email
          ]);
        if(user_email.rows.length!==0){
            return res.status(401).send("Email Already Registered")
        }
        if(employer_address.rows.length!==0){
            
            return res.status(401).send("Address Already Registered")
        }
        const saltRound=10; //how many encryption cycles
        const salt=await bcrypt.genSalt(saltRound);   //process encryptions
        const bcryptPw=await bcrypt.hash(password,salt);  //bcrypt
        const newUser = await pool.query("INSERT INTO employer (user_name,user_email,user_password,user_address,address_long,address_lat) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        [businessname,email,bcryptPw,employeraddress,coords.lng,coords.lat]
        );
        
        const token=jwtGenerator(newUser.rows[0].user_id);
        return res.json({token});
        

    } catch (error) {
        
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
router.post("/login",validInfo,async(req,res)=>{
    try {
        const {email,password}=req.body;
        var user=await pool.query("SELECT * FROM employeeusers WHERE user_email =$1",[email]); //get user with email
        if(user.rows.length===0){
            user=await pool.query("SELECT * FROM employer WHERE user_email =$1",[email]);
            if(user.rows.length===0){
                return res.status(401).json("Password Or Email is incorrect");
            } //if email field is empty
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password); //check if pw of that email is the same as pw in field
        if(!validPassword){
            return res.status(401).json("Password Or Email is incorrect"); 
        }
        const token=jwtGenerator(user.rows[0].user_id);
        return res.json({token});
    } catch (error) {
        
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.get("/verifylogin",authorize, async(req,res)=>{
    try {
        
        res.json(true);
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports=router;