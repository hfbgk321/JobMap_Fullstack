const Pool=require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"POSTGRES PW",
    host:"localhost",
    port: 5432,
    database:"user_list"
});

module.exports=pool;