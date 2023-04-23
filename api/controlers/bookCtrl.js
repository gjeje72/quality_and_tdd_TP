

export default (bookRepo, Book) => {
  const listBooks = (_, res) => {
    let books = bookRepo.listBooks();
    res.send({
      data: books
    });
  };

  const updateBook = (req, res) => {
    let {isbn13, title, authors, editor, langCode, price} = req.body;
    let bookId = req.params.id;

    if(isbn13.toString().length !== 13){
      return res.status(400).send({
        error: 'The isbn13 is malformated'
      })
    }

    let updatedBook = bookRepo.updateBook(
      Number(bookId),
      new Book(isbn13, title, authors, editor, langCode, price)
    );
    if(updatedBook){
      return res.status(200).send({
        data: updatedBook
      });
    }
    res.status(404).send({
      error: `The book ${bookId} is not found`
    })
  } 

  const deleteBook = (req, res) => {
    let bookId = req.params.id;
    let deletedBook = bookRepo.deleteBook(bookId);
    
    return res.status(200).send({
      meta: {
        deletedBook
      }
    })
  }

  const addBook = (req, res) => {
    let data = req.body;
    if (data.isbn13.toString().length !== 13) {
      return res.status(400).send({
        error: 'ISBN is not valid'
      });
    }
    if (typeof data.price !== 'number') {
      return res.status(400).send({
        error: 'Price is not valid'
      });
    }

    let book = bookRepo.addBook(
      new Book(
      data.isbn13,
      data.title,
      data.authors,
      data.editor,
      data.langCode,
      data.price
    ));
    res.status(201).send({
      data:book
    });
  }

  return {
    listBooks,
    addBook,
    updateBook,
    deleteBook
  };
};