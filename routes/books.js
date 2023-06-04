const express = require("express");
const router = express.Router();
const {
	findBooks,
	createbooks,
	getbookbyid,
	updatebook,
	deletebook,
} = require("../controllers/booksController");

router.get("/books", findBooks);
router.post("/books", createbooks);
router.get("/books/:id", getbookbyid);
router.put("/books/:id", updatebook);
router.delete("/books/:id", deletebook);

module.exports = router;
