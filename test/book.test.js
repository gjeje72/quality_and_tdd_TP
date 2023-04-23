import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';

chai.use(chaiHttp);

describe('CRUD Books', function(){
  it('GET /books should return status code 200 with books list', function(done){
    chai.request(api)
      .get('/books')
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(res.body).to.deep.equal({
          data: [
            {
              isbn13: '9782744005084',
              title: 'UML et C++',
              authors: 'Richard C. Lee, William M. Tepfenhart',
              editor: 'CampusPress',
              langCode: 'FR',
              price: 29.95
            },
            {
              isbn13: '9782746035966',
              title: 'Cree su primer sitio web con dreamweaver 8',
              authors: 'B.A. GUERIN',
              editor: 'ENI',
              langCode: 'ES',
              price: 10.02
            }
          ]
        });
        done();
     })
  });
  it('POST /books should create a book and return it with status code 200', function(done){
    const book = {
      isbn13: 9782879017198,
      title: 'Connaitre la Cuisine du Périgord',
      authors: 'Thibault Clementine',
      editor: 'Sud Ouest',
      langCode: 'FR',
      price: 3.9
    };
    chai.request(api)
    .post('/books')
    .send(book)
    .end((_, res) => {
      chai.expect(res).to.have.status(201);
      chai.expect(res.body).to.deep.equal({
        data: book
      });
      done();
    })
  });
  it('POST /books should return a status code 400 if isnb13 malformed', function(done){
    const book = {
      isbn13: 97,
      title: 'Connaitre la Cuisine du Périgord',
      authors: 'Thibault Clementine',
      editor: 'Sud Ouest',
      langCode: 'FR',
      price: 3.9
    };
    chai.request(api)
    .post('/books')
    .send(book)
    .end((_, res) => {
      chai.expect(res).to.have.status(400);
      done();
    });
  });
  it('POST /books should return a status code 400 if price malformed', function(done){
    const book = {
      isbn13: 97,
      title: 'Connaitre la Cuisine du Périgord',
      authors: 'Thibault Clementine',
      editor: 'Sud Ouest',
      langCode: 'FR',
      price: 'any'
    };
    chai.request(api)
    .post('/books')
    .send(book)
    .end((_, res) => {
      chai.expect(res).to.have.status(400);
      done();
    });
  });
  it('PUT /books should return a status code 200 with updated book', function(done){
    const book = {
      isbn13: 9782879017198,
      title: 'Connaitre la Cuisine du Périgord',
      authors: 'Thibault Clementine',
      editor: 'Sud Ouest',
      langCode: 'FR',
      price: 3.9
    };
    chai.request(api)
    .put('/books/9782879017198')
    .send(book)
    .end((_, res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.deep.equal({
        data: book
      });
      done();
    })
  });
  it('PUT /books should return a status code 404 if book not found', function(done){
    const book = {
      isbn13: 9782879000000,
      title: 'Connaitre la Cuisine du Périgord',
      authors: 'Thibault Clementine',
      editor: 'Sud Ouest',
      langCode: 'FR',
      price: 3.9
    };
    chai.request(api)
    .put('/books/9782879000000')
    .send(book)
    .end((_, res) => {
      chai.expect(res).to.have.status(404);
      chai.expect(res.body).to.deep.equal({
        error: 'The book 9782879000000 is not found'
      });
      done();
    })
  });
  it('PUT /books should return a status code 400 if isbn13 malformated', function(done){
    const book = {
      isbn13: 97,
      title: 'Connaitre la Cuisine du Périgord',
      authors: 'Thibault Clementine',
      editor: 'Sud Ouest',
      langCode: 'FR',
      price: 3.9
    };
    chai.request(api)
    .put('/books/97')
    .send(book)
    .end((_, res) => {
      chai.expect(res).to.have.status(400);
      chai.expect(res.body).to.deep.equal({
        error: 'The isbn13 is malformated'
      });
      done();
    })
  });
  it('DELETE /books should return a status code 200 with deleted book', function(done){
    chai.request(api)
    .delete('/books/9782879017198')
    .end((_, res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.deep.equal({
        meta: {
          deletedBook: {
            isbn13: 9782879017198,
            title: 'Connaitre la Cuisine du Périgord',
            authors: 'Thibault Clementine',
            editor: 'Sud Ouest',
            langCode: 'FR',
            price: 3.9
          }
        }
      });
      done();
    })
  });
});