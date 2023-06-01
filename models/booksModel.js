const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		author: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		publishedYear: {
			type: Number,
			trim: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
