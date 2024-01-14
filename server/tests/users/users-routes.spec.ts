import 'mocha';
import request from 'supertest';
import { app } from '../../src/app.js';
import { expect } from 'chai';
import { UserModel } from '../../src/models/users/users-model.js';

describe ('Users', () => {

  // Ejemplos de usuarios
  const user1Correct = {
    name : "Juan",
    surname : "Perez",
    userName : "juanperez",
    password: "juan200A",
    email: "juan@email.com",
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
      await request(app).post('/users').send(user1Correct).expect(201);
    });

  });

});
