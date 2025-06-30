const sql = require("mysql2")

const conn = sql.createConnection({
    host:"localhost",
    user:"root",
    database:"kavi",
    password:"Kavi@6764"
})
conn.connect((err)=>{
    if(err) throw err;
    else return console.log("Database  conncting")
})


module.exports =conn;