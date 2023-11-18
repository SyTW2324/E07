/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import { app } from './app.js';
import cors from 'cors';

import {port} from './env-variables.js';
import { ip_express } from './env-variables.js';

// const cors = require('cors');
// const corsOptions ={
//     origin:'*', 
//     // credentials:true,            //access-control-allow-credentials:true
//     // optionSuccessStatus:200
// }
// app.use(cors(corsOptions));


// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
// });


// Use dynamic CORS configuration for all routes
// app.use(cors(corsOptionsDelegate));

app.listen(port, () => {
  console.log(`Server is up on ip ${ip_express} and port ${port}`);
});

