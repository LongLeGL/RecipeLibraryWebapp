export default function convertDateTime(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = String(a.getHours()).padStart(2, '0');
  var min = String(a.getMinutes()).padStart(2, '0');
  var sec = String(a.getSeconds()).padStart(2, '0');
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}