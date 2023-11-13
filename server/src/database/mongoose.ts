import { connect } from 'mongoose';
import { uri_bbdd } from '../env-variables.js';

try {
  await connect(uri_bbdd);
  console.log('Connection to MongoDB server established');
} catch (error) {
  console.log(error);
}