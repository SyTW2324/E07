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
    // await UserModel.deleteMany(); // Limpieamos la base de datos de usuarios antes de empezar
    await RestaurantModel.deleteMany(); // Limpieamos la base de datos de restaurantes antes de empezar
    // await reservationModel.deleteMany(); // Limpieamos la base de datos de reservas antes de empezar
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
    phoneNumber: '123456789',
    profilePicture: '',
    pictures: [],
    menu: '',
    availability: available1
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
    
  });

  context('GET /restaurants', () => {
  });

  context('GET /restaurants/:id', () => {
  });

  context('PUT /restaurants/:id', () => {
  });

  context('DELETE /restaurants/:id', () => {
  });

});