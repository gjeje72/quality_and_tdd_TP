import { formatDate } from "./index.js";

export default(bookingRepo, Booking, bookRepo, userRepo) => {
  const listBookings = (_, res) => {
    let bookings = bookingRepo.listBookings();
    res.send({
      data: bookings
    })
  }

  const addBooking = (req, res) => {
    let {rentDate, returnDate, isbn13, userId} = req.body;
    
    let formatedRentdate = formatDate(rentDate);

    if(returnDate && returnDate < rentDate){
      return res.status(400).send({
        error: 'Return date must be higher than rent date.' 
      })
    }

    let formatedReturndate = returnDate === null ? null : formatDate(returnDate);

    let booking = bookingRepo.addBooking(
      new Booking(
        null,
        formatedRentdate, 
        formatedReturndate, 
        {isbn13: isbn13}, 
        {id: userId}
      ), 
      bookRepo,
      userRepo
    );
    if(booking === 'book already rent'){
      return res.status(400).send({
        error: 'Book already rent.'
      })
    };
    if(booking === 'book not found'){
      return res.status(404).send({
        error: 'book not found'
      })
    };
    if(booking === 'user not found'){
      return res.status(404).send({
        error: 'user not found'
      })
    };

    res.status(201).send({
      data:booking
    })
  }

  const updateBooking = (req, res) => {
    let returnDate = req.body.returnDate;
    let formatedReturnDate = formatDate(returnDate);
    let uuid = req.params.uuid;
    let booking = bookingRepo.updateBooking(uuid, formatedReturnDate);

    res.status(200).send({
      data: booking
    });
  }

  const deleteBooking = (req, res) => {
    let bookingId = req.params.uuid;
    let deletedBooking = bookingRepo.deleteBooking(bookingId);
    
    return res.status(200).send({
      meta: {
        deletedBooking
      }
    })
  }

  return {
    listBookings,
    addBooking,
    updateBooking,
    deleteBooking
  }
}