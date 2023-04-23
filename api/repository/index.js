import listBooks from './bookRepo.js';
import listUsers from './userRepo.js';
import listBookings from './bookingRepo.js';

export default (model) => ({
  bookRepo: listBooks(model.Book),
  userRepo: listUsers(model.User),
  bookingRepo: listBookings(model.Booking, model.Book, model.User)
});