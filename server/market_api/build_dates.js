Date.prototype.yyyymmddhh = function() {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
  var dd  = this.getDate().toString();
  var hh = this.getHours().toString();
  return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]) + (hh[1]?hh:"0"+hh[0]); // padding
};

Date.prototype.yahoodate = function() {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
  var dd  = this.getDate().toString();
  return yyyy +'-'+ (mm[1]?mm:"0"+mm[0]) +'-'+ (dd[1]?dd:"0"+dd[0]); // padding
};

var todayDate = new Date();
todayDate = todayDate.yahoodate();
var nowDate = new Date();
var lastWeek = new Date(nowDate.getTime()-1000*60*60*24*20);
var lastWeekDate = lastWeek.yahoodate();

module.exports = [todayDate, lastWeekDate];