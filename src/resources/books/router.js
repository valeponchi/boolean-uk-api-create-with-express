const express = require('express')
const { findAll, findOne, createOne } = require('./controller')

const booksRouter = express.Router()

booksRouter.get('/', findAll)

booksRouter.get('/:id', findOne)
// you can also have more than one:
// BooksRouter.get('/:id/:name', (req, res) => {
// 	const {id, name} = Number(req.params.id)
// 	res.json({ Book: `You request Book n. ${id} ${name}` })
// })

booksRouter.post('/', createOne)

module.exports = booksRouter
