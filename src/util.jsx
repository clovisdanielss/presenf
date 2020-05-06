function formmatDate (dateString) {
  var date = new Date(dateString)
  var day = date.getDate().toString()
  day = (day.length === 1) ? '0' + day : day
  var mon = (date.getMonth() + 1).toString() // +1 pois no getMonth Janeiro começa com zero.
  mon = (mon.length === 1) ? '0' + mon : mon
  var year = date.getFullYear()
  return day + '/' + mon + '/' + year
}

function formmatHours (dateString) {
  var date = new Date(dateString)
  var hour = date.getHours()
  var min = date.getMinutes()
  return hour.toString() + ':' + min.toString()
}

export default { formmatDate, formmatHours }
