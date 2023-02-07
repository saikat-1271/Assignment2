const dbConnection = require("../../config/db_connection");
const router = require("express").Router();
const std = require("./student.controller");
const book = require("./book.controller");
const studentController = require("./student.controller");

router.post("/book_insert", book.insertBook);
router.get("/book_list_date", book.bookListByDate);
router.get("/book_date_over", book.bookBorrowCountDay);
router.get("/book_release_all", book.bookReleaseAll);
router.get("/book_release_book_id", book.releaseBookById);

router.get("/book_release_std_id", std.releaseBookById);
router.get("/student_details", std.studentDetails);
router.post("/std_insert", std.insertStudent);
module.exports = router;
