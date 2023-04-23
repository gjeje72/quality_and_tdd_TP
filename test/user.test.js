import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';

chai.use(chaiHttp);

describe('CRUD Users', function(){
  it('GET /users should return status code 200 with users list', function(done){
    chai.request(api)
      .get('/users')
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(res.body).to.deep.equal({
          data: [
            {
              id: '6c84fb90-12c4-11e1-840d-7b25c5ee775a',
              lastName: 'Grollier',
              firstName: 'Theo',
              birthDate: '2001-11-04',
              address: 'Rue de la chatterie - 44800 St Herblain',
              phone: '+33606060606',
              email: 'theo.g@gmail.com'
            },
            {
              id: '31f5df5d-1776-4c5f-af6d-ce473dce3486',
              lastName: 'Diot',
              firstName: 'Jeremy',
              birthDate: '1874-07-23',
              address: 'Rue St Michel - 35000 Rennes',
              phone: '+33606060606',
              email: 'jdiot@hotmail.com'
            }
          ]
        });
        done();
     })
  });
  it('POST /users should create a user and return it with status code 200', function(done){
    const user = {
      lastName: 'Oudea',
      firstName: 'Nicolas',
      birthDate: new Date(2022,4,21),
      address: 'Rue Louis Joxe - 44000 Nantes',
      phone: '+33606060606',
      email: 'noudea@gmail.com'
    };
    chai.request(api)
    .post('/users')
    .send(user)
    .end((_, res) => {
      chai.expect(res).to.have.status(201);
      chai.expect(res.body.data.id).to.have.length(36);
      chai.expect(res.body.data.lastName).to.be.equal(user.lastName);
      chai.expect(res.body.data.firstName).to.be.equal(user.firstName);
      chai.expect(res.body.data.birthDate).to.match(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/);
      chai.expect(res.body.data.address).to.be.equal(user.address);
      chai.expect(res.body.data.phone).to.be.equal(user.phone);
      chai.expect(res.body.data.email).to.be.equal(user.email);
      done();
    })
  });
  it('POST /users should return status code 400 if phone number malformated', function(done){
    const user = {
      lastName: 'Oudea',
      firstName: 'Nicolas',
      birthDate: new Date(2022,4,21),
      address: 'Rue Louis Joxe - 44000 Nantes',
      phone: '+35606060606',
      email: 'noudea@gmail.com'
    };
    chai.request(api)
    .post('/users')
    .send(user)
    .end((_, res) => {
      chai.expect(res).to.have.status(400);
      chai.expect(res.body).to.deep.equal({
        error: 'Phone malformated'
      });
      done();
    })
  });
  it('PUT /users should return a status code 200 with updated user', function(done){
    const user = {
      id: '6c84fb90-12c4-11e1-840d-7b25c5ee775a',
      lastName: 'Grollier',
      firstName: 'Theo',
      birthDate: new Date(2001,11,4),
      address: 'Rue Louis Joxe - 44000 Nantes',
      phone: '+33606060606',
      email: 'theo.g@gmail.com'
    };
    chai.request(api)
    .put('/users/6c84fb90-12c4-11e1-840d-7b25c5ee775a')
    .send(user)
    .end((_, res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res.body.data.id).to.have.length(36);
      chai.expect(res.body.data.lastName).to.be.equal(user.lastName);
      chai.expect(res.body.data.firstName).to.be.equal(user.firstName);
      chai.expect(res.body.data.birthDate).to.match(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/);
      chai.expect(res.body.data.address).to.be.equal(user.address);
      chai.expect(res.body.data.phone).to.be.equal(user.phone);
      chai.expect(res.body.data.email).to.be.equal(user.email);
      done();
    })
  });
  it('PUT /users should return status code 400 if phone number malformated', function(done){
    const user = {
      id: '6c84fb90-12c4-11e1-840d-7b25c5ee775a',
      lastName: 'Grollier',
      firstName: 'Theo',
      birthDate: new Date(2001,11,4),
      address: 'Rue Louis Joxe - 44000 Nantes',
      phone: '1606060606',
      email: 'theo.g@gmail.com'
    };
    chai.request(api)
    .put('/users/6c84fb90-12c4-11e1-840d-7b25c5ee775a')
    .send(user)
    .end((_, res) => {
      chai.expect(res).to.have.status(400);
      chai.expect(res.body).to.deep.equal({
        error: 'Phone malformated'
      });
      done();
    })
  });
  it('DELETE /users should return a status code 200 with deleted user', function(done){
    chai.request(api)
    .delete('/users/6c84fb90-12c4-11e1-840d-7b25c5ee775a')
    .end((_, res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.deep.equal({
        meta: {
          deletedUser: {
            id: '6c84fb90-12c4-11e1-840d-7b25c5ee775a',
            lastName: 'Grollier',
            firstName: 'Theo',
            birthDate: '2001-11-04',
            address: 'Rue Louis Joxe - 44000 Nantes',
            phone: '+33606060606',
            email: 'theo.g@gmail.com'
          }
        }
      });
      done();
    })
  });
  it('DELETE /users should return a status code 404 if uuid not found', function(done){
    chai.request(api)
    .delete('/users/9x84fb90-12c4-11e1-840d-7b25c5ee775a')
    .end((_, res) => {
      chai.expect(res).to.have.status(404);
      chai.expect(res.body).to.deep.equal({
        error: 'User with uuid 9x84fb90-12c4-11e1-840d-7b25c5ee775a not found',
      });
      done();
    })
  });
})