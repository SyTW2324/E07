import 'mocha';
import request from 'supertest';
import { app } from '../../src/app.js';
import { expect } from 'chai';
import { UserModel } from '../../src/models/users/users-model.js';

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
    phoneNumber: 123456789,
    address: "Calle Falsa 123"  
  }



  //Antes de empezar
  before(async () => {
    await UserModel.deleteMany({}); // Limpieamos la base de datos de usuarios antes de empezar
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
      const response = await request(app).post('/users').send(user1).expect(400);
      expect(response.body).to.eql({code: 2, errors: 'Ya existe ese nombre de usuario'});
    });

    it('Should return an error if the email is already in use', async () => {
      const response = await request(app).post('/users').send(user2).expect(400);
      expect(response.body).to.eql({code: 3, errors: 'Ya existe ese correo electrónico'});
    });

    it('Should return an error if the phoneNumber is already in use', async () => {
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
      const response = await request(app).post('/users').send(user12).expect(500);
      console.log(response.body);
    });

  });

});
