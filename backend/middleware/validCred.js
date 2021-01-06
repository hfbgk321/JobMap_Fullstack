module.exports = function(req, res, next) {
    const { email, username, password } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);  //function to check email has correct format
    }
  
    if (req.path === "/register") {
      console.log({ email, username, password });
      if (![email, username, password].every(Boolean)) { //checks for empty fields
        return res.json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.json("Invalid Email"); 
      }
    } else if (req.path === "/login") {
      console.log({ email,  password });
      if (![email, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.json("Invalid Email");
      }
    }
    
    next();
  };