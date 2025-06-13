import moment from 'moment'

function formattedDate(value: string, format = 'DD, MMM-YYYY, HH:mm') {
  if (value === null) return value
  moment.locale('en')
  return moment.utc(value).local().format(format)
}
function shortDate(value: string) {
  moment.locale('en')
  return moment.utc(value).local().format('YYYY/MM')
}
function friendlyTime(value: string) {
  if (value === null) return value
  return moment(value).local().fromNow()
}

export default { formattedDate, shortDate, friendlyTime }
