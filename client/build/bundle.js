/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Portfolio = __webpack_require__(1);
	var Holding = __webpack_require__(2);
	
	window.onload = function() {
	  var url = '/sample_data.json'
	  var userPortfolio = new Portfolio(url);
	  userPortfolio.fetch(Holding);
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	var Portfolio = function(url){
	  this.url = url;
	  this.holdings = [];
	  this.fetch = function(holdingConstructor){
	    var request = new XMLHttpRequest();
	    request.open("GET", this.url);
	
	    request.onload = function(){
	      if(request.status === 200){
	        var jsonString = request.responseText;
	        var portfolio = JSON.parse(jsonString);
	        portfolio.forEach(function (holdingData) {
	          var holdingObject = new holdingConstructor(holdingData);
	          this.holdings.push(holdingObject);
	        }.bind(this))
	        console.log(this.holdings)
	      }
	    }.bind(this)
	    request.send();
	
	  }
	}
	
	module.exports = Portfolio;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var Holding = function (info) {
	  this.buyPrice = info.buyPrice;
	  this.epic = info.epic;
	  this.name = info.name;
	  this.ionex = info.ionex;
	  this.pastCloseOfDayPrices = info.pastCloseOfDayPrices;
	  this.price = info.price;
	  this.quantity = info.quantity;
	}
	
	module.exports = Holding;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map