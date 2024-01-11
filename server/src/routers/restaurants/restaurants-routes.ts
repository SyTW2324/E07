/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */
import express from 'express';

import { validateRestaurantSchema, validateRestaurantSchemaEdit } from '../../models/restaurants/restaurants-models.js';
//import { restaurantInterface } from '../../models/restaurants/restaurants.js';
import { RestaurantModel } from '../../models/restaurants/restaurants-models.js';
import jsonwebtoken from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import { secretKey } from '../../env-variables.js';
import { addHistoricReservations } from '../../models/restaurants/restaurants.js';

import multer from 'multer';
import path from 'path';
 
export const restaurantsRouter = express.Router();

// Ruta asociada con el registro de un nuevo restaurante
restaurantsRouter.post('/restaurants', async (req, res) => {


  try {

    if(req.body.userName && req.body.passwd && req.body.email && req.body.restaurantName && req.body.restaurantAddress && req.body.timeTable && req.body.category && req.body.phoneNumber  && req.body.availability) {
      const restaurant = new  RestaurantModel({
        userName: req.body.userName,
        passwd: req.body.passwd,
        email: req.body.email,
        restaurantName: req.body.restaurantName,
        restaurantAddress: req.body.restaurantAddress,
        description: req.body.description,
        timeTable: req.body.timeTable,
        category: req.body.category,
        phoneNumber: req.body.phoneNumber,
        profilePicture: req.body.profilePicture,
        pictures: req.body.pictures,
        menu: req.body.menu,
        availability: req.body.availability,
        nextReservations: [],
        historicReservations: []
      })
      if (req.body.profilePicture) {
        restaurant.profilePicture = req.body.profilePicture;
      }
      if (req.body.pictures) {
        restaurant.pictures = req.body.pictures;
      }
      if (req.body.menu) {
        restaurant.menu = req.body.menu;
      }
      const restaurantSchemaValidation = await validateRestaurantSchema(restaurant);
      if (restaurantSchemaValidation.code !== 0) {
        return res.status(400).send(restaurantSchemaValidation);
      }
      const newrestaurant = new RestaurantModel(restaurant);
      try {
        const restaurantMessage = await newrestaurant.save();
        return res.status(201).send(restaurantMessage);
      } catch (error) {
        console.error('Error al guardar el restaurante:', error.message);
        return res.status(500).send({
          error: error.message,
          stack: error.stack
        });
      }

    }

    else {
      return res.status(400).send({code: 1, error: "Faltan campos obligatorios"});
    }
  }
  catch(error) {
    return res.status(500).send(
      {
        error: error.message,
        stack: error.stack
      }
    );
  }
});

// Mostrar perfil de un restaurante
restaurantsRouter.get('/restaurants', async (req, res) => {
  try{
    if (req.query.token && req.query.userName) {
      const verified = jsonwebtoken.verify(req.query.token as string, secretKey);
      if (verified) {
        const decodedToken = jwtDecode(req.query.token as string);
        if (Number(decodedToken.exp) > (Date.now() / 1000)) {
          const upDateHistoricReservations = await addHistoricReservations(req.query.userName as string);
          if (upDateHistoricReservations  === false) {
            return res.status(500).send({code: 6, message: "Error al actualizar las reservas históricas"});
          }
          const restaurant = await RestaurantModel.findOne({userName: req.query.userName});
          if(restaurant){
            // renderizar la página de perfil de usuario y guardarla en una carpeta
            const restaurantSend = {
              restaurantName: restaurant.restaurantName,
              userName: restaurant.userName,
              email: restaurant.email,
              phoneNumber: restaurant.phoneNumber,
              restaurantAddress: restaurant.restaurantAddress,
              timeTable: restaurant.timeTable,
              category: restaurant.category,
              menu: restaurant.menu,
              description: restaurant.description,
              pictures: restaurant.pictures,
              nextReservations: restaurant.nextReservations,
              historicReservations: restaurant.historicReservations,
              numberOfTables: restaurant.availability[0].numberOfTables,
              timePeriod: restaurant.availability[0].timePeriod,
              // password: restaurant.passwd
            }
            return res.status(200).send({code: 0, message: restaurantSend});
          }
          else{
            return res.status(404).send({code: 1, message: "Restaurante no encontrado"});
          }
  
        } else {
          return res.status(400).send({code: 2, message: "Token expirado"});
        }
      } else {
        return res.status(400).send({code: 4, message: "Token inválido"});
      }
    } else {
      return res.status(400).send({code: 5, message: "Falta el token en la query"});
    }
  }  
  catch{
    return res.status(500).send();
  }
});


restaurantsRouter.get('/restaurants/info', async (req, res) => {
  try{

    if(req.query.userName == "all"){
      const restaurants = await RestaurantModel.find({});
      if(restaurants){
        
        return res.status(200).send(restaurants);
      }
      else{
        return res.status(404).send({code: 1, error: "Restaurante no encontrado"});
      }
    }   
    else if(req.query.userName){
      const restaurant = await RestaurantModel.findOne({userName: req.query.userName});
      if(restaurant){
        
        return res.status(200).send(restaurant);
      }
      else{
        return res.status(404).send({code: 1, error: "Restaurante no encontrado"});
      }
    }
    else{
      return res.status(400).send({code: 3, error: "Falta el nombre de Restaurante"});
    }
  }  
  catch{
    return res.status(500).send();
  }
});


restaurantsRouter.delete('/restaurants', async (req, res) => {
  try{
    
    if(req.query.userName){
      const restaurant = await RestaurantModel.findOneAndDelete({userName: req.query.userName});
      if(restaurant){
        
        return res.status(200).send(restaurant);
      }
      else{
        return res.status(404).send({code: 1, error: "Restaurante no encontrado"});
      }
    }
    else{
      return res.status(400).send({code: 3, error: "Falta el nombre de usuario"});
    }
  }  
  catch{
    return res.status(500).send();
  }
});





// put
restaurantsRouter.put('/restaurants', async (req, res) => {
  try{
    if (req.query.token && req.query.userName) {

      const verified = jsonwebtoken.verify(req.query.token as string, secretKey);
      if (verified) {
        const decodedToken = jwtDecode(req.query.token as string);
        if (Number(decodedToken.exp) > (Date.now() / 1000)) {
          const upDateHistoricReservations = await addHistoricReservations(req.query.userName as string);
          if (upDateHistoricReservations  === false) {
            return res.status(500).send({code: 6, message: "Error al actualizar las reservas históricas"});
          }
          // const atributesModifiedEnable = ['password', 'email', 'phoneNumber', 'address', 'profilePhoto'];
          const atributesModifiedEnable = [
            'passwd',
            'email',
            'restaurantName',
            'restaurantAddress',
            'description',
            'timeTable',
            'category',
            'phoneNumber',
            'profilePicture',
            'pictures',
            'menu',
            'availability',
          ];
          console.log(req.body);
          const modifiedAtributes = Object.keys(req.body);
          const isValidOperation = modifiedAtributes.every((atribute) => atributesModifiedEnable.includes(atribute));
          if (!isValidOperation) {
            return res.status(400).send({code: 1, message: "Atributos no modificables"});
          }
          const restaurant = await RestaurantModel.findOne({userName: req.query.userName});
          if(restaurant !== null){
            if (req.body.passwd) {
              restaurant.passwd = req.body.passwd;
            }
            if (req.body.email) {
              restaurant.email = req.body.email;
            }
            if (req.body.restaurantName) {
              restaurant.restaurantName = req.body.restaurantName;
            }
            if (req.body.restaurantAddress) {
              restaurant.restaurantAddress = req.body.restaurantAddress;
            }
            if (req.body.description) {
              restaurant.description = req.body.description;
            }
            if (req.body.timeTable) {
              restaurant.timeTable = req.body.timeTable;
            }
            if (req.body.category) {
              restaurant.category = req.body.category;
            }
            if (req.body.phoneNumber) {
              restaurant.phoneNumber = req.body.phoneNumber;
            }
            if (req.body.profilePicture) {
              restaurant.profilePicture = req.body.profilePicture;
            }
            if (req.body.pictures) {
              restaurant.pictures = req.body.pictures;
            }
            if (req.body.menu) {
              restaurant.menu = req.body.menu;
            }
            if (req.body.availability) {
              restaurant.availability = req.body.availability;
            }
            const email = req.body.email ? true : false;
            const phoneNumber = req.body.phoneNumber ? true : false;
            const RestaurantSchemaValidation = await validateRestaurantSchemaEdit(restaurant, email, phoneNumber);
            console.log(RestaurantSchemaValidation);
            if (RestaurantSchemaValidation.code !== 0) {
              return res.status(400).send(RestaurantSchemaValidation);
            }
            await RestaurantModel.findOneAndUpdate({userName: req.query.userName}, restaurant, {
              new: true,
              runValidators: true,
            });
            return res.status(200).send({code: 0, message: "Restaurante modificado correctamente"});
          }
          else{
            return res.status(404).send({code: 2, message: "Restaurante no encontrado"});
          }
  
        } else {
          return res.status(400).send({code: 6, message: "Token expirado"});
        }
      } else {
        return res.status(400).send({code: 7, message: "Token inválido"});
      }
    } else {
      return res.status(400).send({code: 8, message: "Falta el token en la query"});
    }
  }  
  catch{
    return res.status(500).send();
  }
});
