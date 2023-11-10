import { MongoClient } from 'mongodb';

import { uri_bbdd } from './env-variables.js'


async function run() {
  const client = new MongoClient(uri_bbdd);

  try {
    await client.connect();

    const database = client.db('sientateMesa');
    const collection = database.collection('coleccionPrueba');

    // Realiza las operaciones de MongoDB que necesites aquí
    // Por ejemplo:
    const result = await collection.insertOne({ name: 'Ejemplo', age: 30 });
    console.log(`Se ha insertado el documento con el _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
