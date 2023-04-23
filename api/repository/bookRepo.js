export default (Book) => {
  let books = [
    new Book('9782744005084',
     'UML et C++',
     'Richard C. Lee, William M. Tepfenhart',
     'CampusPress',
     'FR',
     29.95),
    new Book('9782746035966',
    'Cree su primer sitio web con dreamweaver 8',
    'B.A. GUERIN',
    'ENI',
    'ES',
    10.02)
  ];

  const listBooks = () => {
    return books;
  }

  const addBook = (book) => {
    books.push(book);
    return book;
  }

  const updateBook = (isbn13, book) => {
    let bookToUpdateIndex = books.findIndex((b) => b.isbn13 === isbn13);

    if (bookToUpdateIndex === -1) {
      return null;
    }

    books[bookToUpdateIndex] = book;

    return book;
  }

  const deleteBook = (id) => {
    let bookToDeleteIndex = books.findIndex((b) => b.isbn13 === id);

    let deletedBook = books.splice(bookToDeleteIndex, 1)[0];

    return deletedBook;
  }

  return {
    addBook,
    updateBook,
    listBooks,
    deleteBook
  };
};