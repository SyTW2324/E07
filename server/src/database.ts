import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // Cambia esto si tu servidor de MongoDB se encuentra en un lugar diferente

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('miBasedeDatos');
    const collection = database.collection('miColeccion');

    // Realiza las operaciones de MongoDB que necesites aquí
    // Por ejemplo:
    const result = await collection.insertOne({ name: 'Ejemplo', age: 30 });
    console.log(`Se ha insertado el documento con el _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
