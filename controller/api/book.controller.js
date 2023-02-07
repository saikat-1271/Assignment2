const { query } = require("express");
const dbConnection = require("../../config/db_connection");
module.exports = {
  insertBook: (req, res) => {
    const book_name = req.body.name;
    const date = req.body.date;
    const std_id = req.body.std_id;
    const sqlToGetCount = "SELECT `limit` FROM `student` WHERE id=?;";
    const sqlToUpdateCount = "UPDATE `student` SET `limit`='?' WHERE id=?;";
    const sqlToAddBook =
      "INSERT INTO books (id, name, date,std_id) VALUES (NULL, ?, ?,?);";
    console.log("yahoo");
    dbConnection.query(sqlToGetCount, [std_id], (err, result) => {
      if (err) {
        // throw err;
        console.log(err);
      } else {
        const limit = result[0].limit;
        if (limit === 0) {
          console.log("not possible");
        } else {
          dbConnection.query(
            sqlToUpdateCount,
            [limit - 1, std_id],
            (err, result) => {
              if (err) {
                throw err;
              } else {
                console.log("student database updated");
              }
            }
          );

          dbConnection.query(
            sqlToAddBook,
            [book_name, date, std_id],
            (err, result) => {
              if (err) {
                throw err;
              } else {
                console.log("book added");
              }
            }
          );
        }
        console.log("done");
      }
    });
  },
  bookListByDate: (req, res) => {
    const startDate = req.body.dates;
    const endDate = req.body.datee;

    const sql = "select * from books where date between ? and ?";
    dbConnection.query(sql, [startDate, endDate], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  },
  bookBorrowCountDay: (req, res) => {
    const curDate = req.body.date;
    console.log("yahoooo");
    const sql = "select * from books having abs(DATEDIFF (date , ? )) > 5;";
    dbConnection.query(sql, [curDate], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    });
  },
  bookReleaseAll: (req, res) => {
    const sqlToDeleteAllRows = "delete from books;";
    const sqlToUpdateAllStudent = "update student set `limit`='15';";

    dbConnection.query(sqlToDeleteAllRows, (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log("all row deleted");
      }
    });

    dbConnection.query(sqlToUpdateAllStudent, (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log("student table updated");
      }
    });

    res.send("done");
  },
  releaseBookById: (req, res) => {
    const id = req.body.id;

    const sqlToFindStudent = "select std_id from books where id=?";
    dbConnection.query(sqlToFindStudent, [id], (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      const std_id = result[0].std_id;

      const sqlToGetLimit = "select student.limit from student where id=?";
      dbConnection.query(sqlToGetLimit, [std_id], (err, result) => {
        if (err) {
          throw err;
        }
        const limit = result[0].limit;
        if (limit == 15) {
          res.send("not library book");
        }
        const sqlToUpdateStudentTable =
          "update student set `limit`='?' where id=?;";
        dbConnection.query(
          sqlToUpdateStudentTable,
          [limit + 1, std_id],
          (err, result) => {
            if (err) {
              throw err;
            } else {
              console.log("limit updated");
            }
          }
        );
      });
    });
    console.log("2nd sql")
    const sqlToDeleteBook = "delete from books where id=?";
    dbConnection.query(sqlToDeleteBook, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log("rows deleted");
      }
    });
  },
};
