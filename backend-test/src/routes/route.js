const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController.js");
const memberController = require("../controllers/memberController.js");
const borrowedBookController = require("../controllers/borrowedBookController.js");

// route for book controller
router.post("/books", bookController.createBook);
router.get("/books", bookController.getAllBook);
router.get("/available-books", bookController.getAvailableBook);
router.put("/books", bookController.putBook);
router.delete("/books/:code", bookController.deleteBook);

// route for member controller
router.post("/members", memberController.createMember);
router.get("/members", memberController.getAllMember);
router.get("/number-of-borrowed-book", memberController.getBorrowedBookByMember);
router.get("/member-borrowing-history", memberController.getHistory);
router.put("/members", memberController.putMember);
router.delete("/members/:code", memberController.deleteMember);

// route for borrowedBook controller
router.post("/borrow-book", borrowedBookController.createBorrowBook);
router.get("/borrow-book", borrowedBookController.getBorrowedBook);
router.put("/borrow-book", borrowedBookController.updateBorrowedBook);

module.exports = router;
