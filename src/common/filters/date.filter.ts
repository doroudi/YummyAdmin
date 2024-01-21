import moment from 'moment'

const formattedDate = function (value: string, format = 'DD, MMM-YYYY, HH:mm') {
  if (value === null)
    return value
  moment.locale('en')
  return moment.utc(value).local().format(format)
}
const shortDate = function (value: string) {
  moment.locale('en')
  return moment.utc(value).local().format('YYYY/MM')
}
const friendlyTime = function (value: string) {
  if (value === null)
    return value
  return moment(value).local().fromNow()
}

export default { formattedDate, shortDate, friendlyTime }
