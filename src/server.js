const express = require('express')
const morgan = require('morgan')

//server
const app = express()
const dbClient = require('./utils/database')
//Routers
const booksRouter = require('./resources/books/router')

//middlewares
//is a piece of code that runs before we can sent a res back from our server
//morgan is a module that prints the req into the console
app.use(morgan('dev'))
app.use(express.json()) // so the server understand json for post,patch,put

//Routes
app.use('/books', booksRouter)

app.get('*', (req, res) => {
	res.json({ msg: 'You request does not match a Route, ok!' })
})

//run server
//the connection between Server and Database
app.listen(4000, () => {
	dbClient.connect(error => {
		if (error) {
			console.log(`Error: `, error)
			// console.error(`Error: `, error.stack)
		} else {
			console.log('Database is connected!')
		}
	})
	console.log('Server is running!')
})
