const Book = require("../models/booksModel");

exports.findBooks = async (req, res) => {
	try {
		const bookCollection = await Book.find();
		return res.json(bookCollection);
	} catch (error) {
		console.log(error);
	}
};

exports.createbooks = async (req, res) => {
	try {
		const { title, author, description, publishedYear } = req.body;
		const insertBookDetails = new Book({
			title,
			author,
			description,
			publishedYear,
		});
		const created = await insertBookDetails.save();
		res.status(201).json(created);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.getbookbyid = async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book) {
			res.status(404).json({ error: "Requested book not found" });
		} else {
			res.json(book);
		}
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
		console.log(error);
	}
};

exports.updatebook = async (req, res) => {
	try {
		const book = await Book.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
			// { overwrite: true }
		);
		if (!book) {
			return res.status(404).json({ error: "Book not found" });
		} else {
			res.json({ data: book });
		}
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
		console.log(error);
	}
};

exports.deletebook = async (req, res) => {
	try {
		const book = await Book.findByIdAndDelete(req.params.id);
		res.json({
			message: "You have deleted a document",
			deletedDocument: book,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json(err.message);
	}
};
