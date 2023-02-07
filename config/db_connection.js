const mysql=require('mysql');
const dbConnection=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "assignment2",
})


module.exports=dbConnection;