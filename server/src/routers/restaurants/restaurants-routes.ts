/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */
import express from 'express';

import { validateRestaurantSchema } from '../../models/restaurants/restaurants-models.js';
//import { restaurantInterface } from '../../models/restaurants/restaurants.js';
import { RestaurantModel } from '../../models/restaurants/restaurants-models.js';
import jsonwebtoken from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import { secretKey } from '../../env-variables.js';
import multer from 'multer';
import path from 'path';
 
export const restaurantsRouter = express.Router();

// Ruta asociada con el registro de un nuevo restaurante
restaurantsRouter.post('/restaurants', async (req, res) => {
  console.log("POST /restaurants recibido fuera del try")
  console.log(req.body);

  try {

    console.log('Petición POST a /restaurants');

    if(req.body.userName && req.body.passwd && req.body.email && req.body.restaurantName && req.body.restaurantAddress && req.body.description && req.body.timeTable && req.body.category && req.body.phoneNumber  && req.body.availability) {
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
      const restaurantMessage = await newrestaurant.save();
      return res.status(201).send(restaurantMessage);

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
        console.log(decodedToken);
        if (Number(decodedToken.exp) > (Date.now() / 1000)) {
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
              menu: restaurant.menu
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
      console.log("all");
      const restaurants = await RestaurantModel.find({});
      if(restaurants){
        
        return res.status(200).send(restaurants);
      }
      else{
        console.log("Restaurante no encontrado");
        return res.status(404).send({code: 1, error: "Restaurante no encontrado"});
      }
    }   
    else if(req.query.userName){
      const restaurant = await RestaurantModel.findOne({userName: req.query.userName});
      if(restaurant){
        
        return res.status(200).send(restaurant);
      }
      else{
        console.log("Restaurante no encontrado");
        return res.status(404).send({code: 1, error: "Restaurante no encontrado"});
      }
    }
    else{
      console.log("Falta el nombre de Restaurante");
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
        console.log("Restaurante no encontrado");
        return res.status(404).send({code: 1, error: "Restaurante no encontrado"});
      }
    }
    else{
      console.log("Falta el nombre de usuario");
      return res.status(400).send({code: 3, error: "Falta el nombre de usuario"});
    }
  }  
  catch{
    return res.status(500).send();
  }
});

