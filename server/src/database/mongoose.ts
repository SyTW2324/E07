import { connect } from 'mongoose';
import { uri_bbdd } from '../env-variables.js';
import { uri_bbdd_test } from '../env-variables.js';
import { uri_bbdd_local } from '../env-variables.js';

let bbdd = uri_bbdd_local;
if (process.argv[2] === 'test') {
  console.log('Usando base de datos de test')
  bbdd = uri_bbdd_test;
} else if (process.argv[2] === 'dev') {
  bbdd = uri_bbdd;
}

console.log('Conectando a la base de datos: ' + bbdd);

try {
  await connect(bbdd);
  console.log('Connection to MongoDB server established');
} catch (error) {
  console.log(error);
}