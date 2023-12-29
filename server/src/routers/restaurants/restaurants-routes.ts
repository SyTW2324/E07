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
      console.log('parte 1')
      if (req.body.profilePicture) {
        console.log('parte 2')
        restaurant.profilePicture = req.body.profilePicture;
        console.log('parte 3')
      }
      if (req.body.pictures) {
        console.log('parte 4')
        restaurant.pictures = req.body.pictures;
        console.log('parte 5')
      }
      if (req.body.menu) {
        console.log('parte 6')
        restaurant.menu = req.body.menu;
        console.log('parte 7')
      }
      console.log('parte 8')
      const restaurantSchemaValidation = await validateRestaurantSchema(restaurant);
      console.log('parte 9')
      if (restaurantSchemaValidation.code !== 0) {
        console.log('parte 10')
        return res.status(400).send(restaurantSchemaValidation);
      }
      console.log('parte 11')
      const newrestaurant = new RestaurantModel(restaurant);
      console.log('parte 12')
      try {
        const restaurantMessage = await newrestaurant.save();
        console.log('parte 13');
        return res.status(201).send(restaurantMessage);
      } catch (error) {
        console.error('Error al guardar el restaurante:', error.message);
        return res.status(500).send({
          error: error.message,
          stack: error.stack
        });
      }
      // console.log('parte 13')
      // return res.status(201).send(restaurantMessage);

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

