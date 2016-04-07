# Project Setup

* To get the mongodb setup:
  * Make sure you have `mongod` running
  * Run `mongo`
  * Run `use dolla_dolla_db`
  * Run `db.portfolio.insert({})` (mongo requires a document in a collection for it to 'exist')
  * Ctrl+C out of mongo's terminal and run `node server/config/seeds.js`