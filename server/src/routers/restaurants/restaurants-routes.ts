/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */
import express from 'express';

import { validateRestaurantSchema } from '../../restaurants/restaurants-models.js';
import { restaurantInterface } from '../../restaurants/restaurants.js';
import { RestaurantModel } from '../../restaurants/restaurants-models.js';

 
export const restaurantsRouter = express.Router();

// Ruta asociada con el registro de un nuevo restaurante
restaurantsRouter.post('/restaurants', async (req, res) => {
  console.log("POST /restaurants recibido fuera del try")
  console.log(req.body);

  try {
    // "userName": "AsadorLaMatanza";
    // "passwd": "Hola1234";
    // "email": "asadormatanza@gmail.com";

    // "restaurantName": "Asador La Matanza";
    // "restaurantAddress": "La Matanza, Tenerife";
    // "description": "Asador de pollos en la Matanza, carne de primera calidad";
    // "timeTable": "";
    // "category": "asador";

    // "phoneNumber": "666666666";
    // "pictures": "null";

    // "menu": "null";
    // "availability": Available[];
    console.log('Petición POST a /restaurants');

    if(req.body.userName && req.body.passwd && req.body.email && req.body.restaurantName && req.body.restaurantAddress && req.body.description && req.body.timeTable && req.body.category && req.body.phoneNumber  && req.body.availability) {
      const restaurant: restaurantInterface = {
        userName: req.body.userName,
        passwd: req.body.passwd,
        email: req.body.email,
        restaurantName: req.body.restaurantName,
        restaurantAddress: req.body.restaurantAddress,
        description: req.body.description,
        timeTable: req.body.timeTable,
        category: req.body.category,
        phoneNumber: req.body.phoneNumber,
        pictures: req.body.pictures,
        menu: req.body.menu,
        availability: req.body.availability,
        nextReservations: [],
        historicReservations: []
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
    
    if(req.query.restaurantName){
      const restaurant = await RestaurantModel.findOne({restaurantName: req.query.restaurantName});
      if(restaurant && restaurant.passwd === req.query.passwd){
        
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

