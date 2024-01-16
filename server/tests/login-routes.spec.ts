import 'mocha';
import request from 'supertest';
import { app } from '../src/app.js';
import { expect } from 'chai';
import { UserModel } from '../src/models/users/users-model.js';
import { RestaurantModel } from '../src/models/restaurants/restaurants-models.js';
import { reservationModel } from '../src/models/reservations/reservantions-models.js';

describe ('/login', () => {
  // Usuario completo
  const user1 = {
    name : "Juan",
    surname : "Perez",
    userName : "juanperezLogin",
    password: "juan200A",
    email: "juanLogin@email.com",
    phoneNumber: 100110000,
    address: "Calle Falsa 123",
    profilePhoto: "",
    nextReservations: [],
    historicReservations: []
  }

  // Restaurante completo
  const restaurant1 = {
    userName: "restauranteLogin",
    passwd: "restarnt200A",
    email: "restaurantelogin@email.com",
    restaurantName: "Restaurante Login",
    restaurantAddress: "Calle Falsa 123",
    description: "Restaurante Login",
    timeTable: "12:00-23:00",
    category: "Italiano",
    phoneNumber: 123456789,
    profilePicture: "",
    pictures: [],
    menu: " ",
    availability: [],
    nextReservations: [],
    historicReservations: []
  }


      //Antes de empezar
  before(async () => {
    await UserModel.deleteMany(); // Limpieamos la base de datos de usuarios antes de empezar
    await RestaurantModel.deleteMany(); // Limpieamos la base de datos de restaurantes antes de empezar
    await reservationModel.deleteMany(); // Limpieamos la base de datos de reservas antes de empezar

    await new UserModel(user1).save(); // Guardamos el usuario en la base de datos
    await new RestaurantModel(restaurant1).save(); // Guardamos el restaurante en la base de datos
  });

  describe('POST /login', () => {
    it('User should login correctly', async () => {
      const res = await request(app).post('/login/authenticate').send({
        userName: user1.userName,
        password: user1.password
      }).expect(200);
      expect(res.body.accessToken)
      expect(res.body.message.username).to.eql(user1.userName);
      expect(res.body.message.password).to.eql(user1.password);
      expect(res.body.message.tipo).to.eql('user');
      expect(res.body.message.profilePhoto).to.eql(" ");
      expect(res.body.code).to.eql(0);
    }
    );

    it('Restaurant should login correctly', async () => {
      const res = await request(app).post('/login/authenticate').send({
        userName: restaurant1.userName,
        password: restaurant1.passwd
      }).expect(200);
      expect(res.body.accessToken)
      expect(res.body.message.username).to.eql(restaurant1.userName);
      expect(res.body.message.password).to.eql(restaurant1.passwd);
      expect(res.body.message.tipo).to.eql('restaurant');
      expect(res.body.message.profilePhoto).to.eql(" ");
      expect(res.body.code).to.eql(0);
    });

    it('User should not login with wrong password', async () => {
      const res = await request(app).post('/login/authenticate').send({
        userName: user1.userName,
        password: "wrongPassword"
      }).expect(400);
      expect(res.body.code).to.eql(4);
      expect(res.body.message).to.eql("Credenciales incorrectas");
    });

    it('Restaurant should not login with wrong password', async () => {
      const res = await request(app).post('/login/authenticate').send({
        userName: restaurant1.userName,
        password: "wrongPassword"
      }).expect(400);
      expect(res.body.code).to.eql(4);
      expect(res.body.message).to.eql("Credenciales incorrectas");
    });

    it('User should not login with wrong userName', async () => {
      const res = await request(app).post('/login/authenticate').send({
        userName: "wrongUserName",
        password: user1.password
      }).expect(400);
      expect(res.body.code).to.eql(4);
      expect(res.body.message).to.eql("Credenciales incorrectas");
    });

    it('Restaurant should not login with wrong userName', async () => {
      const res = await request(app).post('/login/authenticate').send({
        userName: "wrongUserName",
        password: restaurant1.passwd
      }).expect(400);
      expect(res.body.code).to.eql(4);
      expect(res.body.message).to.eql("Credenciales incorrectas");
    });

    it('User should not login with empty userName', async () => {
      const res = await request(app).post('/login/authenticate').send({
        userName: "",
        password: user1.password
      }).expect(400);
      expect(res.body.code).to.eql(1);
      expect(res.body.message).to.eql("Faltan campos obligatorios");
    });

    it('Restaurant should not login with empty userName', async () => {
      const res = await request(app).post('/login/authenticate').send({
        userName: "",
        password: restaurant1.passwd
      }).expect(400);
      expect(res.body.code).to.eql(1);
      expect(res.body.message).to.eql("Faltan campos obligatorios");
    });

    it('User should not login with empty password', async () => {
      const res = await request(app).post('/login/authenticate').send({
        userName: user1.userName,
        password: ""
      }).expect(400);
      expect(res.body.code).to.eql(1);
      expect(res.body.message).to.eql("Faltan campos obligatorios");
    });

    it('Restaurant should not login with empty password', async () => {
      const res = await request(app).post('/login/authenticate').send({
        userName: restaurant1.userName,
        password: ""
      }).expect(400);
      expect(res.body.code).to.eql(1);
      expect(res.body.message).to.eql("Faltan campos obligatorios");
    });

  });
});