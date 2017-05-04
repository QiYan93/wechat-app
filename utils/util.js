function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getDateDiff = (dateTimeStamp) => {
    let minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        month = day * 30,
        year = month * 12,
        now = new Date().getTime(),
        diffValue = now - dateTimeStamp,
        result = '';

    if (diffValue < 0) {
        return;
    }

    let yearC = diffValue / year,
        monthC = diffValue / month,
        weekC = diffValue / (7 * day),
        dayC = diffValue / day,
        hourC = diffValue / hour,
        minC = diffValue / minute;
    if (yearC >= 1) {
        result = "" + parseInt(yearC) + "年前";
    } else if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else {
        result = "刚刚";
    }

    return result;
}

module.exports = {
  formatTime: formatTime,
  getDateDiff:getDateDiff
}

