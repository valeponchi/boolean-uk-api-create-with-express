const dbClient = require('../../utils/database')

// model is singular
// table is plural
function Book() {
	function createTable() {
		//SERIAL MEANS IT WILL INCREASE AUTOMATICALLY
		//PRIMARY KEY MEANS IT IS UNIQUE
		//UNIQUE IS FOR WHAT ELSE YOU WANT TO BE UNIQUE
		const sql = `
    DROP TABLE IF EXISTS books;
    
    CREATE TABLE IF NOT EXISTS books (
      id              SERIAL        PRIMARY KEY,
      title           VARCHAR(255)   NOT NULL,
      type            VARCHAR(255)   NOT NULL,
      author          VARCHAR(255)   NOT NULL,
      topic           VARCHAR(255)   NOT NULL,
      publicationDate DATE           NOT NULL
    );
  `
		//this will return a Promise with the result of whatever the query gives us
		//QUERY sends sql to the server
		//SQL run the table and send back the response
		//the response is what is returned
		dbClient.query(sql).then(result => {
			console.log('Books table created!')
		})
	}

	function findOneBook(bookId) {
		const sql = `
    SELECT * FROM books 
    WHERE id = ($1);
    `
		//$1 matches the first El in this array:
		dbClient.query(sql, [bookId]).then(result => {
			callback(result.rows[0])
		})
	}

	const findAllBooks = callback => {
		const sql = `
      SELECT * FROM books 
      `

		db.query(sql).then(result => {
			callback(result.rows)
		})
	}

	//callback can be whatever, in this case a function
	function createOneBook(newBook, callback) {
		const { title, type, author, topic, publicationDate } = newBook
		const sql = `
    INSERT INTO books
      (title, type, author, topic, publicationDate)
    VALUES
      ($1, $2, $3, $4, $5)
      RETURNING *
  `
		//$1 matches the first El in this array:
		//the result will be the newBook just created
		dbClient
			.query(sql, [title, type, author, topic, publicationDate])
			.then(result => {
				callback(result.rows[0])
			})
		// here you need .catch()
	}

	createTable()

	//this is what it will return
	return {
		createOneBook,
		findOneBook,
		findAllBooks,
	}
}

module.exports = Book
