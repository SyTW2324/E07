/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */
import express from 'express';
import { UserModel } from '../../models/users/users-model.js';
import { RestaurantModel } from '../../models/restaurants/restaurants-models.js';
import jsonwebtoken from 'jsonwebtoken';
import { secretKey } from '../../env-variables.js';



export const loginRouter = express.Router();


 loginRouter.post('/login/authenticate', async (req, res) => {
  
    try {
      if(req.body.userName && req.body.password) {
          const user = await UserModel.findOne({userName: req.body.userName});
          const restaurant = await RestaurantModel.findOne({userName: req.body.userName});

          if(user && user.password === req.body.password){

            const userToken = jsonwebtoken.sign({ username: user.userName, password: user.password }, secretKey, { expiresIn: '1h' });
            const resMessage = {
              username: user.userName,
              password: user.password,
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
            const userToken = jsonwebtoken.sign({ username: restaurant.userName, password: restaurant.passwd }, secretKey, { expiresIn: '1h' });
            const resMessage = {
              username: restaurant.userName,
              password: restaurant.passwd,
              accessToken: userToken,
              tipo: "restaurant",
              profilePhoto: " ",
            }
            

            if (restaurant.profilePicture) {
              resMessage.profilePhoto = restaurant.profilePicture;
            }
            return res.status(200).send({ code: 0, message: resMessage});
          } else{
            return res.status(400).send({code: 4, message: "Credenciales incorrectas"});
          }
  
      } else {
        return res.status(400).send({code: 1, message: "Faltan campos obligatorios"});
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


