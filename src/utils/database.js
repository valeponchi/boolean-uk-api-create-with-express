//this is called (in other languages) config file

// const pg = require("pg")
// const db = pg.Client

const { Client } = require('pg')
const dotenv = require('dotenv') //to connect db with server
dotenv.config()

//ElephantSQL URL
const connectionUrl = process.env.PGURL

const dbClient = new Client(connectionUrl)

module.exports = dbClient
