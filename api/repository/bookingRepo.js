
import { v4 as uuidv4 } from 'uuid';

export default (Booking, Book, User) => {
  let bookings = [
    new Booking(
      '482535b2-3ff0-43fe-b42a-caa4a37ca6bb',
      '2023-04-15', 
      '2023-04-16',
      new Book(
        '9782744005084',
        'UML et C++',
        'Richard C. Lee, William M. Tepfenhart',
        'CampusPress',
        'FR',
        29.95
      ),
      new User(
        '31f5df5d-1776-4c5f-af6d-ce473dce3486',
        'Diot',
        'Jeremy',
        '1874-07-23',
        'Rue St Michel - 35000 Rennes',
        '+33606060606',
        'jdiot@hotmail.com'
      )
    )
  ];

  const listBookings = () => {
    return bookings;
  }

  const addBooking = (booking, bookRepo, userRepo) => {
    let isRent = bookings.some((b) => b.returnDate === null && b.item.isbn13 === booking.item.isbn13);
    if(isRent){
      return 'book already rent';
    }
    
    let books = bookRepo.listBooks();
    let bookIndex = books.findIndex((b) => b.isbn13 === booking.item.isbn13);
    
    if(bookIndex === -1){
      return 'book not found';
    }
    let book = books[bookIndex];

    let users = userRepo.listUsers();
    let userIndex = users.findIndex((u) => u.id === booking.user.id);
    
    if(userIndex === -1){
      return 'user not found';
    }

    let user = users[userIndex];
    let bookingToCreate = new Booking(
      uuidv4(),
      booking.rentDate,
      booking.returnDate,
      book,
      user
    );
    bookings.push(
      bookingToCreate
      );
    return bookingToCreate;
  }

  const updateBooking = (uuid, returnDate) => {
    let bookingIndex = bookings.findIndex((b) => b.id === uuid);
    bookings[bookingIndex].returnDate = returnDate;
    return bookings[bookingIndex];
  }

  const deleteBooking = (bookingId) => {
    let bookingToDeleteIndex = bookings.findIndex((b) => b.id === bookingId);

    let deletedBooking = bookings.splice(bookingToDeleteIndex, 1)[0];

    return deletedBooking;
  }

  return {
    listBookings,
    addBooking,
    updateBooking,
    deleteBooking
  }
}