import statusCheck from './statusCheck.js';
import bookCtrl from './bookCtrl.js';
import userCtrl from './userCtrl.js';
import bookingCtrl from './bookingCtrl.js';

export function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth()),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export default (repositories, model) => ({
  statusCheck,
  bookCtrl: bookCtrl(repositories.bookRepo, model.Book),
  userCtrl: userCtrl(repositories.userRepo, model.User),
  bookingCtrl: bookingCtrl(repositories.bookingRepo, model.Booking, repositories.bookRepo, repositories.userRepo),
});


