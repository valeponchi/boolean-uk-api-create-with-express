const express = require('express')
const { findAll, findOne, createOne } = require('./controller')

const booksRouter = express.Router()

booksRouter.get('/', findAll)

booksRouter.get('/:id', findOne)

booksRouter.post('/', createOne)

module.exports = booksRouter
