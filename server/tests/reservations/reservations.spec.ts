import 'mocha';
import request from 'supertest';
import { app } from '../../src/app.js';
import { expect } from 'chai';
import { UserModel } from '../../src/models/users/users-model.js';
import { RestaurantModel } from '../../src/models/restaurants/restaurants-models.js';
import { reservationModel } from '../../src/models/reservations/reservantions-models.js';
import jsonwebtoken from 'jsonwebtoken';
import {Reservation} from '../../src/models/reservations/reservation.js';

import { calcularPeriodosDisponibles } from '../../src/models/reservations/reservation.js';
 
interface Timetable {
  selectedDays: string[]; // Array de días seleccionados (por ejemplo, ['Lunes', 'Miércoles'])
  startingHour: string | null; // Hora de inicio en formato de cadena (por ejemplo, '10:00')
  finishingHour: string | null; // Hora de finalización en formato de cadena (por ejemplo, '14:00')
}
type Available = {
  timePeriod: Number; // minutos para cada reserva, por ejemplo 60 minutos.
  numberOfTables: number;
};

import { ObjectId } from 'mongodb';
import e from 'express';


describe('Reservations', () => {

  describe('Functions periodTime', () => {

    it('should return the available periods', () => {
      const startingHour = '12:00';
      const finishingHour = '16:00';
      const timePeriod = 30;
      const availablePeriods = calcularPeriodosDisponibles(startingHour, finishingHour, timePeriod);
      expect(availablePeriods).to.eql(['12:00 - 12:29', '12:30 - 12:59', '13:00 - 13:29', '13:30 - 13:59', '14:00 - 14:29', '14:30 - 14:59', '15:00 - 15:29', '15:30 - 15:59']);
    });

    it('should return the available periods', () => {
      const startingHour = '12:00';
      const finishingHour = '16:00';
      const timePeriod = 60;
      const availablePeriods = calcularPeriodosDisponibles(startingHour, finishingHour, timePeriod);
      expect(availablePeriods).to.eql(['12:00 - 12:59', '13:00 - 13:59', '14:00 - 14:59', '15:00 - 15:59']);
    });

    it('should return the available periods', () => {
      const startingHour = '12:00';
      const finishingHour = '00:00';
      const timePeriod = 60;
      const availablePeriods = calcularPeriodosDisponibles(startingHour, finishingHour, timePeriod);
      expect(availablePeriods).to.eql(['12:00 - 12:59', '13:00 - 13:59', '14:00 - 14:59', '15:00 - 15:59', '16:00 - 16:59', '17:00 - 17:59', '18:00 - 18:59', '19:00 - 19:59', '20:00 - 20:59', '21:00 - 21:59', '22:00 - 22:59', '23:00 - 23:59']);
      
    });

    it('should return the available periods', () => {
      const startingHour = '12:00';
      const finishingHour = '16:00';
      const timePeriod = 15;
      const availablePeriods = calcularPeriodosDisponibles(startingHour, finishingHour, timePeriod);
      expect(availablePeriods).to.eql(['12:00 - 12:14', '12:15 - 12:29', '12:30 - 12:44', '12:45 - 12:59', '13:00 - 13:14', '13:15 - 13:29', '13:30 - 13:44', '13:45 - 13:59', '14:00 - 14:14', '14:15 - 14:29', '14:30 - 14:44', '14:45 - 14:59', '15:00 - 15:14', '15:15 - 15:29', '15:30 - 15:44', '15:45 - 15:59']);
    });
  });

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

    const restaurant1 = {
      userName: "antoniomendez",
      passwd: "toni200A",
      email: "boqueron@gmail.com",
      restaurantName: "Boqueron",
      restaurantAddress: "Calle Falsa 123",
      description: "Restaurante de comida mediterránea",
      timeTable: {
        selectedDays: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
        startingHour: "12:00",
        finishingHour: "16:00",
      },
      category: "asador",
      phoneNumber: 123456787,
      availability:  {
        timePeriod: 60,
        numberOfTables:  2,  
      }

     }

  before(async () => {
    await UserModel.deleteMany(); // Limpieamos la base de datos de usuarios antes de empezar
    await RestaurantModel.deleteMany(); // Limpieamos la base de datos de restaurantes antes de empezar
    await reservationModel.deleteMany(); // Limpieamos la base de datos de reservas antes de empezar
  });

  describe('crear un entorno estable', () => {

    it('should create a user', async () => {
      const response = await request(app).post('/users').send(user1);
      expect(response.status).to.eql(201);
    });

    it('should create a restaurant', async () => {
      const response = await request(app).post('/restaurants').send(restaurant1);
      expect(response.status).to.eql(201);
    });
  });
  
  describe('POST /reservations', async () => {
    let token = " ";
    before(async () => {
      const response = await request(app).post('/login/authenticate').send({userName: user1.userName, password: user1.password});
      token = response.body.message.accessToken;
    });

    it('should create a reservation', async () => {
      const response = await request(app).post('/reservations').send({token: token,
        restaurantName: restaurant1.restaurantName,
        userName: user1.userName,
        day: new Date('2024-01-21T14:50:43.042+00:00')});
      expect(response.status).to.eql(200);
  
    });

    it('should create a reservation', async () => {
      const response = await request(app).post('/reservations').send({token: token,
        restaurantName: restaurant1.restaurantName,
        userName: user1.userName,
        day: new Date('2024-02-21T14:50:43.042+00:00')});
      expect(response.status).to.eql(200);
  
    });

    it('should create a reservation', async () => {
      const response = await request(app).post('/reservations').send({token: token,
        restaurantName: restaurant1.restaurantName,
        userName: user1.userName,
        day: new Date('2024-02-21T14:50:43.042+00:00')});
      expect(response.status).to.eql(200);
  
    });

    it('should create a reservation', async () => {
      const response = await request(app).post('/reservations').send({token: "token",
        restaurantName: restaurant1.restaurantName,
        userName: user1.userName,
        day: new Date('2024-02-21T14:50:43.042+00:00')});
      expect(response.status).to.eql(500);
  
    });

    it('should not create a reservation if the user is not logged in', async () => {
      const response = await request(app).post('/reservations').send({
        restaurantName: restaurant1.restaurantName,
        userName: user1.userName,
        day: new Date('2024-01-21T14:50:43.042+00:00')});
      expect(response.status).to.eql(400);
    });   

    it('should not create a reservation if the restaurant does not exist', async () => {
      const response = await request(app).post('/reservations').send({token: token,
        restaurantName: "Restaurante que no existe",
        userName: user1.userName,
        day: new Date('2024-01-21T14:50:43.042+00:00')});
      expect(response.status).to.eql(404);
    });

    it('should not create a reservation if the user does not exist', async () => {
      const response = await request(app).post('/reservations').send({token: token,
        restaurantName: restaurant1.restaurantName,
        userName: "Usuario que no existe",
        day: new Date('2024-01-21T14:50:43.042+00:00')});
      expect(response.status).to.eql(404);
    });

    it('should not create a reservation if the day is not valid', async () => {
      const response = await request(app).post('/reservations').send({token: token,
        restaurantName: restaurant1.restaurantName,
        userName: user1.userName,
        });
      expect(response.status).to.eql(400);
    });  
  });

  describe('GET /reservations', async () => {
    let token = " ";
    let reservationId = " ";
    before(async () => {
      const response = await request(app).post('/login/authenticate').send({userName: user1.userName, password: user1.password});
      token = response.body.message.accessToken;
      // hago un get del usuario
      const response1 = await request(app).get(`/users/?token=${token}&&userName=${user1.userName}`).expect(200);

      reservationId = response1.body.message.nextReservations[0];
      
    });

    it('should get a reservation', async () => {
      const response = await request(app).get(`/reservations/?id=${reservationId}`).expect(200);
      expect(response.status).to.eql(200);
    });

    it('should not get a reservation if the id is not valid', async () => {
      const response = await request(app).get(`/reservations/?id=123456789`).expect(500);
      expect(response.status).to.eql(500);
    });

    it('should not get a reservation if the id does not exist', async () => {
      const response = await request(app).get(`/reservations/?id=${new ObjectId()}`).expect(404);
      expect(response.status).to.eql(404);
    });

  });

  describe('GET /reservationsAvailable', async () => {

    it('should get the available reservations of a day', async () => {
      let day = '03/21/2024';
      const response = await request(app).get(`/reservationsAvailable/?RestaurantName=${restaurant1.restaurantName}&day=${day}`).expect(200);
      expect(response.status).to.eql(200);
      expect(response.body.message).to.eql(['12:00 - 12:59', '13:00 - 13:59', '14:00 - 14:59', '15:00 - 15:59']);
    });

    it('should get the available reservations of a day', async () => {
      let day = '02/21/2024';
      const response = await request(app).get(`/reservationsAvailable/?RestaurantName=${restaurant1.restaurantName}&day=${day}`).expect(200);
      expect(response.status).to.eql(200);
      expect(response.body.message).to.eql(['12:00 - 12:59', '13:00 - 13:59', '14:00 - 14:59', '15:00 - 15:59']);
    });

    it('should not get the available reservations of a day if the restaurant does not exist', async () => {
      let day = '02/21/2024';
      const response = await request(app).get(`/reservationsAvailable/?RestaurantName=Restaurante que no existe&day=${day}`).expect(404);
      expect(response.status).to.eql(404);
    });

    it('should not get the available reservations of a day if the day is not valid', async () => {
      let day = '02/21/2024';
      const response = await request(app).get(`/reservationsAvailable/?RestaurantName=${restaurant1.restaurantName}`).expect(404);
      expect(response.status).to.eql(404);
    });

    it('should not get the available reservations of a day if the day is not valid', async () => {
      let day = '01/21/2024';
      const response = await request(app).get(`/reservationsAvailable/?RestaurantName=${restaurant1.restaurantName}&day=${day}`).expect(200);
      expect(response.body.message).to.eql(['12:00 - 12:59', '13:00 - 13:59', '14:00 - 14:59', '15:00 - 15:59']);
    });

  });


  describe('DELETE /reservations', async () => {

    let token = " ";
    let reservationId = " ";
    before(async () => {
      const response = await request(app).post('/login/authenticate').send({userName: user1.userName, password: user1.password});
      token = response.body.message.accessToken;
      // hago un get del usuario
      const response1 = await request(app).get(`/users/?token=${token}&&userName=${user1.userName}`).expect(200);

      reservationId = response1.body.message.nextReservations[0];
      
    });

    it('should delete a reservation', async () => {
      const response = await request(app).delete(`/reservations/?token=${token}&userName=${user1.userName}&reservationId=${reservationId}`).expect(200);
      expect(response.status).to.eql(200);
    });
    
    it('should not delete a reservation if the user is not logged in', async () => {
      const response = await request(app).delete(`/reservations/?userName=${user1.userName}&reservationId=${reservationId}`).expect(400);
      expect(response.status).to.eql(400);
    });

    it('should not delete a reservation', async () => {
      const response = await request(app).delete(`/reservations/?token=${"token"}&userName=${user1.userName}&reservationId=${reservationId}`).expect(200);
      expect(response.status).to.eql(500);
    });

    it('should not delete a reservation if the user does not exist', async () => {
      const response = await request(app).delete(`/reservations/?token=${token}&userName=Usuario que no existe&reservationId=${reservationId}`).expect(404);
      expect(response.status).to.eql(404);
    });

    it('should not delete a reservation if the reservation does not exist', async () => {
      const response = await request(app).delete(`/reservations/?token=${token}&userName=${user1.userName}&reservationId=${new ObjectId()}`).expect(404);
      expect(response.status).to.eql(404);
    });
  });

});



