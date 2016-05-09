#Shares App

##Outline
More and more people are playing the stock market. A local trader has come to you with a portfolio of shares. She wants to be able to analyse it more effectively. She has a small sample data set to give you and would like you to build a minimal viable product (MVP) that uses the data to display her portfolio in useful ways so that she can make better decisions.


##Project Setup

* To get the mongodb setup:
  * Make sure you have `mongod` running
  * Run `mongo`
  * Run `use dolla_dolla_db`
  * Run `db.portfolio.insert({})` (mongo requires a document in a collection for it to 'exist')
  * Ctrl+C out of mongo's terminal and run `node server/config/seeds.js`

* Run `npm install` from `client/` and from `server/`
* Have `mongod` running
* Run `npm start` from `client/` and from `server/`
* Open your browser to http://localhost:3000/
