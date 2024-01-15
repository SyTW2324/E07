import 'mocha';
import request from 'supertest';
import { app } from '../../src/app.js';
import { expect } from 'chai';
import { UserModel } from '../../src/models/users/users-model.js';
import { RestaurantModel } from '../../src/models/restaurants/restaurants-models.js';
import { reservationModel } from '../../src/models/reservations/reservantions-models.js';
import jsonwebtoken from 'jsonwebtoken';
import { addHistoricReservations } from '../../src/models/users/users.js';
import { Timetable } from '../../src/timeTable.js';
import { Available } from '../../src/available.js';

// userName: req.body.userName,
// passwd: req.body.passwd,
// email: req.body.email,
// restaurantName: req.body.restaurantName,
// restaurantAddress: req.body.restaurantAddress,
// description: req.body.description,
// timeTable: req.body.timeTable,
// category: req.body.category,
// phoneNumber: req.body.phoneNumber,
// profilePicture: req.body.profilePicture,
// pictures: req.body.pictures,
// menu: req.body.menu,
// availability: req.body.availability,

  before(async () => {
    await UserModel.deleteMany(); // Limpieamos la base de datos de usuarios antes de empezar
    await RestaurantModel.deleteMany(); // Limpieamos la base de datos de restaurantes antes de empezar
    await reservationModel.deleteMany(); // Limpieamos la base de datos de reservas antes de empezar
  });

describe('Restaurants', () => {

  const timeTable1: Timetable = {
    selectedDays: ['Lunes', 'Miércoles'],
    startingHour: '10:00',
    finishingHour: '14:00'
  }

  const available1: Available = {
    timePeriod: 60,
    numberOfTables: 10
  }

  
  const restaurant1 = {
    userName: 'restaurant1',
    passwd: 'prueba200A',
    email: 'rest1@gmail.com',
    restaurantName: 'restaurante 1',
    restaurantAddress: 'Dirección de prueba',
    description: 'Descripción de prueba',
    timeTable: timeTable1,
    category: 'Italiano',
    phoneNumber: '123333555',
    profilePicture: '',
    pictures: [],
    menu: '',
    availability: available1
  }

  const restaurant2 = {
    userName: 'restaurant2',
    passwd: 'prueba200A',
    email: 'rest2@gmail.com',
    restaurantName: 'restaurante 2',
    restaurantAddress: 'Dirección de prueba',
    description: 'Descripción de prueba',
    timeTable: timeTable1,
    category: 'Italiano',
    phoneNumber: '123334335',
    profilePicture: '',
    pictures: [],
    menu: '',
    availability: available1
  }

  const user1 = {
    name : "Juan",
    surname : "Perez",
    userName : "restaurant2",
    password: "juan200A",
    email: "rest2@gmail.com",
    phoneNumber: 123334335,
    address: "Calle Falsa 123"
  }

  context('POST /restaurants', () => {
    it('Nuevo restaurante creado correctamente', async () => {
      const response = await request(app).post('/restaurants').send(restaurant1);
      expect(response.status).to.equal(201);
      expect(response.body.userName).to.eql(restaurant1.userName);
      expect(response.body.email).to.eql(restaurant1.email);
      expect(response.body.restaurantName).to.eql(restaurant1.restaurantName);
      expect(response.body.restaurantAddress).to.eql(restaurant1.restaurantAddress);
      expect(response.body.description).to.eql(restaurant1.description);
      expect(response.body.timeTable[0].selectedDays).to.eql(restaurant1.timeTable.selectedDays);
      expect(response.body.timeTable[0].startingHour).to.eql(restaurant1.timeTable.startingHour);
      expect(response.body.timeTable[0].finishingHour).to.eql(restaurant1.timeTable.finishingHour);
      expect(response.body.category).to.eql(restaurant1.category);
      expect(response.body.phoneNumber).to.eql(restaurant1.phoneNumber);
      expect(response.body.profilePicture).to.eql(restaurant1.profilePicture);
      expect(response.body.pictures).to.eql(restaurant1.pictures);
      expect(response.body.menu).to.eql(restaurant1.menu);
      expect(response.body.availability[0].timePeriod).to.eql(restaurant1.availability.timePeriod);
      expect(response.body.availability[0].numberOfTables).to.eql(restaurant1.availability.numberOfTables);
    });

    it('error 400, ya existe el nombre de usuario en otro restaurante', async () => {
      const response = await request(app).post('/restaurants').send(restaurant1);
      expect(response.status).to.equal(400);
      expect(response.body.errors).to.eql('Ya existe ese nombre de usuario');
      expect(response.body.code).to.eql(2);
    });

    it('error 400, ya existe el email en otro restaurante', async () => {
      restaurant1.userName = 'restaurant2';
      const response = await request(app).post('/restaurants').send(restaurant1);
      expect(response.status).to.equal(400);
      expect(response.body.errors).to.eql('Ya existe ese correo electrónico');
      expect(response.body.code).to.eql(3);
    });

    it('error 400, ya existe el teléfono en otro restaurante', async () => {
      restaurant1.email = 'rest2@gmail.com';
      const response = await request(app).post('/restaurants').send(restaurant1);
      expect(response.status).to.equal(400);
      expect(response.body.errors).to.eql('Ya existe ese número de teléfono');
      expect(response.body.code).to.eql(4);
      restaurant1.userName = 'restaurant1';
      restaurant1.email = 'rest1@gmail.com';
    });

    it('Usuario de prueba creado', async () => {
      const response = await request(app).post('/users').send(user1).expect(201);
    });

    it('error 400, ya existe el nombre de usuario en un usuario', async () => {
      const response = await request(app).post('/restaurants').send(restaurant2);
      expect(response.status).to.equal(400);
      expect(response.body.errors).to.eql('Ya existe ese nombre de usuario');
      expect(response.body.code).to.eql(2);
    });

    it('error 400, ya existe el email en un usuario', async () => {
      restaurant2.userName = 'restaurant3';
      const response = await request(app).post('/restaurants').send(restaurant2);
      expect(response.status).to.equal(400);
      expect(response.body.errors).to.eql('Ya existe ese correo electrónico');
      expect(response.body.code).to.eql(3);
    });

    it('error 400, ya existe el teléfono en un usuario', async () => {
      restaurant2.email = 'restaurant3@gmail.com';
      const response = await request(app).post('/restaurants').send(restaurant2);
      expect(response.status).to.equal(400);
      expect(response.body.errors).to.eql('Ya existe ese número de teléfono');
      expect(response.body.code).to.eql(4);
    });

    it('prueba error 500, catch', async () => {
      const response = await request(app).post('/restaurants').send(
        {
          campoInexistente: 'prueba'
        }
      );
      expect(response.status).to.equal(400);
    });
    
  });

  context('GET /restaurants', () => {
    let token = " ";
    before(async () => {
      const response = await request(app).post('/login/authenticate').send({userName: restaurant1.userName, password: restaurant1.passwd});
      // const response = await request(app).post('/login/authenticate').send({userName: 'restaurant1', password: 'prueba200A'});
      token = response.body.message.accessToken;
    });

    it('Lista de restaurantes', async () => {
      // pedir todos los restaurantes
    });

    it('Obtener un restaurante correctamente', async () => {
      const response = await request(app).get(`/restaurants/?token=${token}&&userName=${restaurant1.userName}`).expect(200);
    });

    it('Obtener un restaurante falla, token inválido', async () => {
      const response = await request(app).get(`/restaurants/?token=${'1234'}&&userName=${restaurant1.userName}`).expect(500);
    });

    it('Obtener un restaurante falla, userName inválido', async () => {
      const response = await request(app).get(`/restaurants/?token=${token}&&userName=${'pepe09'}`).expect(500);
    });

    it('Obtener un restaurante falla, falta el token en la query', async () => {
      const response = await request(app).get(`/restaurants/?userName=${restaurant1.userName}`).expect(400);
    });

    it('obtener todos los restaurantes', async () => {
      const response = await request(app).get(`/restaurants/info/?userName=${'all'}`).expect(200);
    });

  });

  context('GET /restaurants/:id', () => {
  });

  context('PUT /restaurants/:id', () => {
  });

  context('DELETE /restaurants/:id', () => {
    it('Should delete the user', async () => {
      // const response = await request(app).delete(`/restaurants/?userName=${restaurant1.userName}`).expect(200);
    });

    // it('Should return an error if the user does not exist', async () => {
    //   const response = await request(app).delete(`/users/?userName=${user1.userName}`).expect(404);
    //   expect(response.body).to.eql({code: 4, message: 'Usuario no encontrado'});
    // });

    // it('Should return an error if the userName is missing', async () => {
    //   const response = await request(app).delete('/users/').expect(400);
    //   expect(response.body).to.eql({code: 3, message: 'Falta el nombre de usuario'});
    // });
  });

});