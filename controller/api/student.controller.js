const dbConnection = require("../../config/db_connection");
module.exports = {
  insertStudent: (req, res) => {
    const std_name = req.body.name;
    const std_email = req.body.email;
    const sql ="INSERT INTO `student` (`id`, `name`, `mail`, `limit`) VALUES (NULL, ?, ?, '15');";
    dbConnection.query(sql, [std_name, std_email], (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log("success");
      }
    });
  },
  studentDetails: (req,res)=>{
    const sql="SELECT student.name, student.limit, 15-student.limit as remaining,books.name as Book_Name from student join books ON student.id=books.std_id;"
    dbConnection.query(sql,(err,result)=>{
      if(err){
        throw err;
      }
      else{
        res.send(result);
      }
    })
  },
  releaseBookById:(req,res)=>{
    const id=req.body.id;
    const sql="delete from books where std_id=?";
    dbConnection.query(sql,[id],(err,result)=>{
      if(err){
        throw err;
      }
      else{
        console.log("rows deleted");
      }
    })

    const sqlToUpdateStudentTable="update student set `limit`='15' where id=?;"
      dbConnection.query(sqlToUpdateStudentTable,[id],(err,result)=>{
        if(err){
          throw err;
        }
        else{
          console.log("limit set to 15");
        }
      })
  }
};
