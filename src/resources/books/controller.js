const Book = require('./model')

//set up my Book model
//Books table gets created
const { createOneBook, findOneBook, findAllBooks } = Book()

// function findAll(req, res) {
// 	res.json({ Books: 'All Books here..' })
// }
function findAll(req, res) {
	findAllBooks(books => {
		res.json({ books })
	})
}

function findOne(req, res) {
	const { id } = req.params

	//the second arg is the callback (in model.js) and the arg is the result
	//so now we can use it to send it back to the frontend.
	findOneBook(Number(id), book => {
		res.json({ book })
	})
}

function createOne(req, res) {
	const newBook = req.body

	//create a new Book
	createOneBook(newBook, createdBook => {
		//send it back to the frontend
		res.json({ Book: createdBook })
	})
}

module.exports = { findAll, findOne, createOne }
