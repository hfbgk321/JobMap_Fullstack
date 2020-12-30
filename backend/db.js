const Pool=require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"CHANGETHIS",
    host:"localhost",
    port: 5432,
    database:"user_list"
});

module.exports=pool;