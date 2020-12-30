const jwt=require("jsonwebtoken");
require("dotenv").config()

module.exports=async (req,res,next)=>{
    try {
        const jwtToken=req.header("token"); 
        if(!jwtToken){
            res.status(403).json("Not Authorize");//check if token field in header exists
        }
        const payload=jwt.verify(jwtToken,process.env.jwtSecret); //verify that tokens match
        req.user=payload.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(403).json("Not Authorize");
    }
}