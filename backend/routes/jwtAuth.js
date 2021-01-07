const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwtGenerator=require("../utils/jwtGenerator");
const validInfo = require("../middleware/validCred");
const authorize = require("../middleware/authorization");

router.post("/registeremployee", validInfo,async (req,res) =>{
    try {

        const { username,email,password, } = req.body;
        const user_email = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
          ]);
        const user_name= await pool.query("SELECT * FROM users WHERE user_name = $1", [
            username
          ]);
        if(user_name.rows.length!==0){
            return res.status(401).send("Username Already Registered")
        }
        if(user_email.rows.length!==0){
            return res.status(401).send("Email Already Registered")
        }
        const saltRound=10; //how many encryption cycles
        const salt=await bcrypt.genSalt(saltRound);   //process encryptions
        const bcryptPw=await bcrypt.hash(password,salt);  //bcrypt
        const newUser = await pool.query("INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",
        [username,email,bcryptPw]
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
        const user_email = await pool.query("SELECT * FROM employer WHERE user_email = $1", [
            email
          ]);
        const business_name= await pool.query("SELECT * FROM employer WHERE user_name = $1", [
            businessname
          ]);
        const employer_address= await pool.query("SELECT * FROM employer WHERE user_address = $1", [
            employeraddress
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
        const newUser = await pool.query("INSERT INTO employer (user_name,user_email,user_password,user_address) VALUES ($1,$2,$3,$4) RETURNING *",
        [businessname,email,bcryptPw,employeraddress]
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
        const user=await pool.query("SELECT * FROM users WHERE user_email =$1",[email]); //get user with email
        if(user.rows.length===0){
            return res.status(401).json("Password Or Email is incorrect"); //if email field is empty
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password); //check if pw of that email is the same as pw in field
        if(!validPassword){
            return res.status(401).json("Password Or Email is incorrect"); 
        }
        console.log(1);
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