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

	findOneBook(Number(id), Book => {
		res.json({ Book: `You requested Book n. ${id}` })
		// or this:
		// BooksRouter.get('/:id/:name', (req, res) => {
		// 	const id = Number(req.params.id)
		// 	res.json({ Book: `You request Book n. ${id} ${name}` })
		// })
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
