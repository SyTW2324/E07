/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */
import express from 'express';

import { validateLoginSchema } from '../../login/login-model.js';
import { loginInterface } from '../../login/login.js';
import { LoginModel } from '../../login/login-model.js';


export const loginRouter = express.Router();


 loginRouter.post('/login', async (req, res) => {
  
    try {
  
      console.log('Petición POST a /login');
      if(req.body.userName && req.body.password) {
        const login: loginInterface = {
          userName: req.body.userName,
          password: req.body.password,
        }
          const loginSchemaValidation = await validateLoginSchema(login);
          if (loginSchemaValidation.code !== 0) {
            return res.status(400).send(loginSchemaValidation);
          }
          const newLogin = new LoginModel(login);
          const loginMessage = await newLogin.save();
          return res.status(201).send(loginMessage);
  
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


