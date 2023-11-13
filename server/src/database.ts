import { MongoClient } from 'mongodb';

import { uri_bbdd } from './env-variables.js'

import * as mongodb from "mongodb";

export interface prueba {
  name: string;
}


async function run() {
  const client = new MongoClient(uri_bbdd);

  try {
    console.log("Estableciendo conexión con la base de datos...")
    await client.connect();
    console.log("Conexión con la base de datos establecida");

    const database = client.db('sientateMesa');

    // Realiza las operaciones de MongoDB que necesites aquí
    // Por ejemplo:
    const pruebaCollection = database.collection<prueba>("coleccionPrueba");

    const result = await pruebaCollection.insertOne({ name: 'Ejemplo'});
    console.log(`Se ha insertado el documento con el _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
