
export default (controlers, app) => {
  app.get('/statusCheck', controlers.statusCheck.getStatus);
  
  app.get('/books', controlers.bookCtrl.listBooks);
  app.post('/books', controlers.bookCtrl.addBook);
  app.put('/books/:id', controlers.bookCtrl.updateBook);
  app.delete('/books/:id', controlers.bookCtrl.deleteBook);
  
  app.get('/users', controlers.userCtrl.listUsers);
  app.post('/users', controlers.userCtrl.addUser);
  app.put('/users/:uuid', controlers.userCtrl.updateUser);
  app.delete('/users/:uuid', controlers.userCtrl.deleteUser);

  app.get('/bookings', controlers.bookingCtrl.listBookings);
  app.post('/bookings', controlers.bookingCtrl.addBooking);
  app.put('/bookings/:uuid', controlers.bookingCtrl.updateBooking);
  app.delete('/bookings/:uuid', controlers.bookingCtrl.deleteBooking);
}

