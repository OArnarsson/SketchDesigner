function shortDate(date) {
	return date.slice(0,10);
}

function longDate() {
     let d = new Date();
      var datestring = ("0" + d.getDate()).slice(-2) + "." + ("0"+(d.getMonth()+1)).slice(-2) + "." +
      d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) + ":" + ("0" + d.getMilliseconds()).slice(-3);
      return datestring;
}

console.log(longDate());
console.log(shortDate(longDate()));