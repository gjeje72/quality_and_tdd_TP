import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';

chai.use(chaiHttp);
let createdUUID = '';
describe('CRUD Bookings', function(){
  it('GET /bookings should return status code 200 with bookings list', function(done){
    chai.request(api)
      .get('/bookings')
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(res.body).to.deep.equal({
          data: [
            {
              id: '482535b2-3ff0-43fe-b42a-caa4a37ca6bb',
              rentDate: '2023-04-15',
              returnDate: '2023-04-16',
              item: {
                isbn13: '9782744005084',
                title: 'UML et C++',
                authors: 'Richard C. Lee, William M. Tepfenhart',
                editor: 'CampusPress',
                langCode: 'FR',
                price: 29.95
              },
              user: {
                id: '31f5df5d-1776-4c5f-af6d-ce473dce3486',
                lastName: 'Diot',
                firstName: 'Jeremy',
                birthDate: '1874-07-23',
                address: 'Rue St Michel - 35000 Rennes',
                phone: '+33606060606',
                email: 'jdiot@hotmail.com'
              },
            },
          ]
        });
        done();
     })
  });
  it('POST /bookings should create a user and return it with status code 200', function(done){
    const booking = {
      rentDate: new Date(2023,4,15),
      returnDate: null,
      isbn13: '9782744005084',
      userId: '31f5df5d-1776-4c5f-af6d-ce473dce3486',
    };
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      createdUUID = res.body.data.id;
      chai.expect(res).to.have.status(201);
      chai.expect(res.body.data.id).to.have.length(36);
      chai.expect(res.body.data.user.id).to.be.equal(booking.userId);
      chai.expect(res.body.data.item.isbn13).to.be.deep.equal(booking.isbn13);
      done();
    })
  });
  it('POST /bookings should return status code 400 if returnDate less than rentDate', function(done){
    const booking = {
      rentDate: new Date(2023,4,15),
      returnDate: new Date(2023,4,14),
      isbn13: '9782744005084',
      userId: '31f5df5d-1776-4c5f-af6d-ce473dce3486',
    };
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      chai.expect(res).to.have.status(400);
      chai.expect(res.body).to.deep.equal({
        error: 'Return date must be higher than rent date.'
      });
      done();
    })
  });
  it('POST /bookings should return status code 400 if book already rent', function(done){
    const booking = {
      rentDate: new Date(2023,4,15),
      returnDate: null,
      isbn13: '9782744005084',
      userId: '31f5df5d-1776-4c5f-af6d-ce473dce3486',
    };
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      chai.expect(res).to.have.status(400);
      chai.expect(res.body).to.deep.equal({
        error: 'Book already rent.'
      });
      done();
    })
  });
  it('POST /bookings should return status code 404 if book not found', function(done){
    const booking = {
      rentDate: new Date(2023,4,15),
      returnDate: new Date(2023,4,16),
      isbn13: '9782744005080',
      userId: '31f5df5d-1776-4c5f-af6d-ce473dce3486',
    };
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      chai.expect(res).to.have.status(404);
      chai.expect(res.body).to.deep.equal({
        error: 'book not found'
      });
      done();
    })
  });
  it('POST /bookings should return status code 404 if user not found', function(done){
    const booking = {
      rentDate: new Date(2023,4,15),
      returnDate: new Date(2023,4,16),
      isbn13: '9782746035966',
      userId: '31f5df5d-1776-4c5f-af6d-ce473dce3400',
    };
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      chai.expect(res).to.have.status(404);
      chai.expect(res.body).to.deep.equal({
        error: 'user not found'
      });
      done();
    })
  });
  it('PUT /booking should return a status code 200 with updated booking', function(done){
    const booking = {
      id: createdUUID,
      returnDate: new Date(2023,4,16),
    };
    chai.request(api)
    .put(`/bookings/${createdUUID}`)
    .send(booking)
    .end((_, res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res.body.data.id).to.be.equal(createdUUID);
      chai.expect(res.body.data.returnDate).to.be.equal('2023-04-16');
      done();
    })
  });
  it('DELETE /booking shoud return a status code 200 with deleted booking', function(done){
    chai.request(api)
    .delete(`/bookings/${createdUUID}`)
    .end((_, res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res.body.meta.deletedBooking.id).to.be.equal(createdUUID);
      done();
    });
  })
});