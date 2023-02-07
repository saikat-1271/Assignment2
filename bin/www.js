const app=require("../app");
const dbConnection=require('../config/db_connection');
dbConnection.connect((err)=>{
    if(err){
        throw err;
    }
    else{
        console.log('Connected');
    }
});

app.listen(3000);
