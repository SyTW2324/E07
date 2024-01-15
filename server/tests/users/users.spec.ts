import 'mocha';
import request from 'supertest';
import { app } from '../../src/app.js';
import { expect } from 'chai';
import { UserModel } from '../../src/models/users/users-model.js';
import { RestaurantModel } from '../../src/models/restaurants/restaurants-models.js';
import { reservationModel } from '../../src/models/reservations/reservantions-models.js';
import jsonwebtoken from 'jsonwebtoken';
import { addHistoricReservations } from '../../src/models/users/users.js';

describe ('Users', () => {

  // Usuario completo
  const user1 = {
    name : "Juan",
    surname : "Perez",
    userName : "juanperez",
    password: "juan200A",
    email: "juan@email.com",
    phoneNumber: 123456789,
    address: "Calle Falsa 123"
  }

  // Usuario con email repetido
  const user2 = {
    name : "Juan",
    surname : "Perez",
    userName : "juanperez2",
    password: "juan200A",
    email: "juan@email.com",
    phoneNumber: 123456789,
    address: "Calle Falsa 123"
  }

  // Usuario con teléfono repetido
  const user3 = {
    name : "Juan",
    surname : "Perez",
    userName : "juanperez3",
    password: "juan200A",
    email: "juan3@email.com",
    phoneNumber: 123456789,
    address: "Calle Falsa 123"
  }

  // Usuario al que le falta el email
  const user4 = {
    name: "Antonio",
    surname: "Garcia",
    userName: "antoniogarcia",
    password: "ant200A",
    phoneNumber: 987654321,
    address: "Calle Falsa 321"
  }

  // Usuario al que le falta el teléfono
  const user5 = {
    name: "Antonio",
    surname: "Garcia",
    userName: "antoniogarcia2",
    password: "ant200A",
    email: "antonio@email.com",
    address: "Calle Falsa 321"
  }

  // Usuario al que le falta la dirección
  const user6 = {
    name: "Antonio",
    surname: "Garcia",
    userName: "antoniogarcia3",
    password: "ant200A",
    email: "antonio3@email.com",
    phoneNumber: 987654321
  }

  // Usuario al que le falta el nombre
  const user7 = {
    surname: "Garcia",
    userName: "antoniogarcia4",
    password: "ant200A",
    email: "antonio4@email.com",
    phoneNumber: 987654321,
    address: "Calle Falsa 321"
  }

  // Usuario al que le falta el apellido
  const user8 = {
    name: "Antonio",
    userName: "antoniogarcia5",
    password: "ant200A",
    email: "antonio5@email.com",
    phoneNumber: 987654321,
    address: "Calle Falsa 321"
  }

  // Usuario al que le falta el nombre de usuario
  const user9 = {
    name: "Antonio",
    surname: "Garcia",
    password: "ant200A",
    email: "antonio5@email.com",
    phoneNumber: 987654321,
    address: "Calle Falsa 321"
  }

  // Usuario al que le falta la contraseña
  const user10 = {
    name: "Antonio",
    surname: "Garcia",
    userName: "antoniogarcia5",
    email: "antonio5@email.com",
    phoneNumber: 987654321,
    address: "Calle Falsa 321"
  }

  // Usuario con campo foto de perfil en data URL
  const user11 = {
    name : "Juan",
    surname : "Perez",
    userName : "juanperez3",
    password: "juan200A",
    email: "juan3@email.com",
    phoneNumber: 987654321,
    address: "Calle Falsa 123",
    profilePhoto: "data"
  }

  // Usuario con un formato incorrecto de email
  const user12 = {
    name: "Pepe",
    surname: "Garcia",
    userName: "pepegarcia",
    password: "pepe200A",
    email: "pepeemail.com", 
    phoneNumber: 321654987,
    address: "Calle Falsa 123"  
  }


  //Antes de empezar
  beforeEach(async () => {
    await UserModel.deleteMany(); // Limpieamos la base de datos de usuarios antes de empezar
    await RestaurantModel.deleteMany(); // Limpieamos la base de datos de restaurantes antes de empezar
    await reservationModel.deleteMany(); // Limpieamos la base de datos de reservas antes de empezar
  });

  // Test
  describe('POST /users', () => {

    it('Shoul create a new user successfully', async () => {
      const response = await request(app).post('/users').send(user1).expect(201);
      expect(response.body.name).to.eql(user1.name);
      expect(response.body.surname).to.eql(user1.surname);
      expect(response.body.userName).to.eql(user1.userName);
      expect(response.body.password).to.eql(user1.password);
      expect(response.body.email).to.eql(user1.email);
      expect(response.body.phoneNumber).to.eql(String(user1.phoneNumber));
      expect(response.body.address).to.eql(user1.address);
    });

    it('Should return an error if the userName already in use', async () => {
      await request(app).post('/users').send(user1).expect(201);
      const response = await request(app).post('/users').send(user1).expect(400);
      expect(response.body).to.eql({code: 2, errors: 'Ya existe ese nombre de usuario'});
    });

    it('Should return an error if the email is already in use', async () => {
      await request(app).post('/users').send(user1).expect(201);
      const response = await request(app).post('/users').send(user2).expect(400);
      expect(response.body).to.eql({code: 3, errors: 'Ya existe ese correo electrónico'});
    });

    it('Should return an error if the phoneNumber is already in use', async () => {
      await request(app).post('/users').send(user1).expect(201);
      const response = await request(app).post('/users').send(user3).expect(400);
      expect(response.body).to.eql({code: 4, errors: 'Ya existe número de teléfono'});
    }); 

    it('Should return an error if the email is missing', async () => {
      const response = await request(app).post('/users').send(user4).expect(400);
      expect(response.body).to.eql({code: 1, message: 'Faltan campos obligatorios'});
    });

    it('Should return an error if the phoneNumber is missing', async () => {
      const response = await request(app).post('/users').send(user5).expect(400);
      expect(response.body).to.eql({code: 1, message: 'Faltan campos obligatorios'});
    });

    it('Should return an error if the address is missing', async () => {
      const response = await request(app).post('/users').send(user6).expect(400);
      expect(response.body).to.eql({code: 1, message: 'Faltan campos obligatorios'});
    });

    it('Should return an error if the name is missing', async () => {
      const response = await request(app).post('/users').send(user7).expect(400);
      expect(response.body).to.eql({code: 1, message: 'Faltan campos obligatorios'});
    });

    it('Should return an error if the surname is missing', async () => {
      const response = await request(app).post('/users').send(user8).expect(400);
      expect(response.body).to.eql({code: 1, message: 'Faltan campos obligatorios'});
    });

    it('Should return an error if the userName is missing', async () => {
      const response = await request(app).post('/users').send(user9).expect(400);
      expect(response.body).to.eql({code: 1, message: 'Faltan campos obligatorios'});
    });

    it('Should return an error if the password is missing', async () => {
      const response = await request(app).post('/users').send(user10).expect(400);
      expect(response.body).to.eql({code: 1, message: 'Faltan campos obligatorios'});
    });

    it('Should create a user with a profile photo', async () => {
      const response = await request(app).post('/users').send(user11).expect(201);
      expect(response.body.name).to.eql(user11.name);
      expect(response.body.surname).to.eql(user11.surname);
      expect(response.body.userName).to.eql(user11.userName);
      expect(response.body.password).to.eql(user11.password);
      expect(response.body.email).to.eql(user11.email);
      expect(response.body.phoneNumber).to.eql(String(user11.phoneNumber));
      expect(response.body.address).to.eql(user11.address);
      expect(response.body.profilePhoto).to.eql(user11.profilePhoto);
    });

    it('Should return an error with 500 status if the email is not valid', async () => {
      await request(app).post('/users').expect(500).send(user12);
    });

  });

  describe('GET /users', () => {
    let token = " ";
    beforeEach(async () => {
      await request(app).post('/users').send(user1).expect(201);
      const response = await request(app).post('/login/authenticate').send({userName: user1.userName, password: user1.password});
      token = response.body.message.accessToken;
    });

    it ('Should return the user information', async () => {

      const response = await request(app).get(`/users/?token=${token}&&userName=${user1.userName}`).expect(200);
      expect(response.body.message.name).to.eql(user1.name);
      expect(response.body.message.surname).to.eql(user1.surname);
      expect(response.body.message.userName).to.eql(user1.userName);
      expect(response.body.message.email).to.eql(user1.email);
      expect(response.body.message.phoneNumber).to.eql(String(user1.phoneNumber));
      expect(response.body.message.address).to.eql(user1.address);
      expect(response.body.message.nextReservations).exist;
      expect(response.body.message.historicReservations).exist;
    });

    it ('Should return an error if the user does not exist', async () => {
      const response = await request(app).get(`/users/?token=${token}&&userName=pepe`).expect(404);
      expect(response.body).to.eql({code: 1, message: 'Usuario no encontrado'});
    });

    it('Should return an error if the token is not valid', async () => {
      const notValidToken = jsonwebtoken.sign({userName: user1.userName, password: user1.password}, "notValid", {expiresIn: '1h'});
      await request(app).get(`/users/?token=${notValidToken}&&userName=${user1.userName}`).expect(500);
    });

    it('Should return an error if the token is missing', async () => {
      const response = await request(app).get(`/users/?userName=${user1.userName}`).expect(400);
      expect(response.body).to.eql({code: 5, message: 'Falta el token en la query'});
    });

    it('Should return an error if user schema is corrupted', async () => {
      const user13 = {
        name : "Reservas",
        surname : "Reservas",
        userName : "reervasPrueba",
        password: "reservasPrueba200A",
        email: "reservas@email.com",
        phoneNumber: 364724829,
        address: "Calle Falsa 123"
      }
      const response = await request(app).post('/users').send(user13).expect(201);
      const token2 = response.body.accessToken;
      const reservaFalsa = "659febe03bd40849a9b0d96b";
      UserModel.findOneAndUpdate({userName: user13.userName}, {$push: {nextReservations: reservaFalsa}});
      const response2 = await request(app).get(`/users/?token=${token2}&&userName=${user13.userName}`).expect(500);
    });

  });

  describe('PUT /users', () => {
    let token = " ";
    beforeEach(async () => {
      await request(app).post('/users').send(user1).expect(201);
      const response = await request(app).post('/login/authenticate').send({userName: user1.userName, password: user1.password});
      token = response.body.message.accessToken;
    });

    it('Should get an error if email is already in use', async () => {
      const userUpdate = {
        email: user1.email
      }
      const response = await request(app).put(`/users/?token=${token}&&userName=${user1.userName}`).send(userUpdate).expect(400);
      expect(response.body).to.eql({code: 3, errors: 'Ya existe ese correo electrónico'});
    });

    it('Should get an error if phoneNumber is already in use', async () => {
      const userUpdate = {
        phoneNumber: user1.phoneNumber
      }
      const response = await request(app).put(`/users/?token=${token}&&userName=${user1.userName}`).send(userUpdate).expect(400);
      expect(response.body).to.eql({code: 4, errors: 'Ya existe número de teléfono'});
    });

    it('Should update the user email', async () => {
      const userUpdate = {
        email: "juanito@email.com"
      }
      const response = await request(app).put(`/users/?token=${token}&&userName=${user1.userName}`).send(userUpdate).expect(200);
    });

    it('Should get an error if trying to update the userName', async () => {
      const userUpdate = {
        userName: "juanito"
      }
      const response = await request(app).put(`/users/?token=${token}&&userName=${user1.userName}`).send(userUpdate).expect(400);
      expect(response.body).to.eql({code: 1, message: 'Atributos no modificables'});
    });

    it('Should get an error if token is not provided', async () => {
      const userUpdate = {
        email: "juanito@email.com"
      }
      const response = await request(app).put(`/users/?userName=${user1.userName}`).send(userUpdate).expect(400);
      expect(response.body).to.eql({code: 8, message: 'Falta el token en la query'});
    });

    it('Should get an error if user does not exist, and trying to update it reservations', async () => {
      const userEmail = {
        email: "juanito@email.com"
      }
      const response = await request(app).put(`/users/?token=${token}&&userName=pepe`).send(userEmail).expect(500);
    });


  });

  describe('Functions from users-model', () => {
    beforeEach(async () => {
      await request(app).post('/users').send(user1).expect(201);
    });
    
    it('Should update the user historic reservations if it exists', async () => {
      expect(await addHistoricReservations(user1.userName)).to.eql(true);
    });

    it ('Should not update the user historic reservations if it does not exist', async () => {
      expect(await addHistoricReservations("pepe")).to.eql(false);
    });

    it('Should not update the user historic reservations if is corrupted', async () => {
      const corruptedReservation = '659febe03bd40849a9b0d96b';
      await UserModel.findOneAndUpdate({userName: user1.userName}, {$push: {nextReservations: corruptedReservation}});
      expect(await addHistoricReservations(user1.userName)).to.eql(false);
    });

  });

  describe('DELETE /users', () => {
    it('Should delete the user', async () => {
      await request(app).post('/users').send(user1).expect(201);
      const response = await request(app).delete(`/users/?userName=${user1.userName}`).expect(200);
      expect(response.body.name).to.eql(user1.name);
      expect(response.body.surname).to.eql(user1.surname);
      expect(response.body.userName).to.eql(user1.userName);
      expect(response.body.password).to.eql(user1.password);
      expect(response.body.email).to.eql("juan@email.com");
      expect(response.body.phoneNumber).to.eql(String(user1.phoneNumber));
      expect(response.body.address).to.eql(user1.address);
    });

    it('Should return an error if the user does not exist', async () => {
      const response = await request(app).delete(`/users/?userName=${user1.userName}`).expect(404);
      expect(response.body).to.eql({code: 4, message: 'Usuario no encontrado'});
    });

    it('Should return an error if the userName is missing', async () => {
      const response = await request(app).delete('/users/').expect(400);
      expect(response.body).to.eql({code: 3, message: 'Falta el nombre de usuario'});
    });

  });



});
