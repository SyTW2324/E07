/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */
import express from 'express';

// import { validateLoginSchema } from '../../login/login-model.js';
// import { loginInterface } from '../../login/login.js';
// import { LoginModel } from '../../login/login-model.js';
import { UserModel } from '../../models/users/users-model.js';
import { RestaurantModel } from '../../models/restaurants/restaurants-models.js';
import jsonwebtoken from 'jsonwebtoken';
import { secretKey } from '../../env-variables.js';


export const loginRouter = express.Router();


 loginRouter.post('/login/authenticate', async (req, res) => {
  
    try {
  
      console.log('Petición POST a /login');
      console.log(req.body.userName);
      if(req.body.userName && req.body.password) {
        // const login: loginInterface = {
        //   userName: req.body.userName,
        //   password: req.body.password,
        // }
          //const loginSchemaValidation = await validateLoginSchema(login);
          const user = await UserModel.findOne({userName: req.body.userName});
          const restaurant = await RestaurantModel.findOne({userName: req.body.userName});
          // if (loginSchemaValidation.code !== 0) {
          //   return res.status(400).send(loginSchemaValidation);
          // }
          console.log(user);
          if(user && user.password === req.body.password){
            // const newLogin = new LoginModel(login);
            // const loginMessage = await newLogin.save();
            const userToken = jsonwebtoken.sign({ username: user.userName, password: user.password }, secretKey, { expiresIn: '1h' });
            const resMessage = {
              username: user.userName,
              accessToken: userToken,
              tipo: "user",
              profilePhoto: " "
            }
              if (user.profilePhoto) {
                resMessage.profilePhoto = user.profilePhoto;
              }
            return res.status(200).send({ code: 0, message: resMessage});
          } 
          else if(restaurant && restaurant.passwd === req.body.password){
            // const newLogin = new LoginModel(login);
            // const loginMessage = await newLogin.save();
            const userToken = jsonwebtoken.sign({ username: restaurant.userName, password: restaurant.passwd }, secretKey, { expiresIn: '1h' });
            const resMessage = {
              username: restaurant.userName,
              accessToken: userToken,
              tipo: "restaurant"
            }
            return res.status(200).send({ code: 0, message: resMessage});
          } else{
            console.log("Contraseña incorrecta");
            return res.status(404).send({code: 4, message: "Contraseña incorrecta"});
          }
  
      } else {
        return res.status(400).send({code: 1, message: "Faltan campos obligatorios"});
      }
      //return res.status(201).send({user: "usuario", message: "mensaje"});
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


