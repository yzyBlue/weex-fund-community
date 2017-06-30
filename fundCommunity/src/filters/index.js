export function emptyCheck (value) {
  return value == null ? "无内容":value;
} 

export function timeAgo (time) {
  if (typeof time === undefined || time === "") {
      return ;
  }
  var ftime = dbtime2jstime(time);
  const between = (Date.now()  - Number(ftime))/ 1000
  
//   console.log(ftime)
//   console.log(Date.now())
//   console.log(between);
  if (between < 60) {
    return '刚刚'
  } else if (between < 3600) {
    return pluralize(~~(between / 60), ' minute') + ' ago'
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour') + ' ago'
  } else {
    return pluralize(~~(between / 86400), ' day') + ' ago'
  }
}

function dbtime2jstime (time) {
    var strs = time.split('T');

    var yr = strs[0].split('-')[0];
    var mh = strs[0].split('-')[1];
    var dy = strs[0].split('-')[2];
    var hr = strs[1].split(':')[0];
    var me = strs[1].split(':')[1];
    var sd = strs[1].split(':')[2];
    
    var objDate = new Date(yr, mh-1, dy, hr, me, sd);
    // console.log(objDate)
    // console.log(Date())
    return objDate.getTime();
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}