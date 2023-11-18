/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */
import express from 'express';

import { validateUserSchema } from '../../users/users-model.js';
import { userInterface } from '../../users/users.js';
import { UserModel } from '../../users/users-model.js';


export const usersRouter = express.Router();

// Ruta asociada con el registro de un nuevo usuario
usersRouter.post('/users', async (req, res) => {

  try {

    console.log('Petición POST a /users');
    if(req.body.name && req.body.surname && req.body.userName && req.body.password && req.body.email && req.body.phoneNumber && req.body.address) {
      const user: userInterface = {
        name: req.body.name,
        surname: req.body.surname,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        profilePhoto: null
      }
      if (req.body.profilePhoto) {
        user.profilePhoto = req.body.profilePhoto;
      }
        const userSchemaValidation = await validateUserSchema(user);
        if (userSchemaValidation.code !== 0) {
          return res.status(400).send(userSchemaValidation);
        }
        const newUser = new UserModel(user);
        const userMessage = await newUser.save();
        return res.status(201).send(userMessage);

    } else {
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

// Mostrar perfil de un usuario
usersRouter.get('/users', async (req, res) => {
  try{
    
    if(req.query.userName){
      const user = await UserModel.findOne({userName: req.query.userName});
      if(user && user.password === req.query.password){
        
        return res.status(200).send(user);
      }
      else{
        console.log("Usuario no encontrado");
        return res.status(404).send({code: 1, error: "Usuario no encontrado"});
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

