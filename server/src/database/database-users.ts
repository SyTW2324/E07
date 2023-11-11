import { Collection, MongoClient } from 'mongodb';

import { uri_bbdd } from '../env-variables.js'
import {userInterface} from '../users/users.js'

import * as fs from 'fs';

let client: MongoClient;
let usersCollection: Collection;

async function connectToDatabase() {
        client = new MongoClient(uri_bbdd);

        try {
        console.log("Estableciendo conexión con la base de datos...")
        await client.connect();
        console.log("Conexión con la base de datos establecida");

        const database = client.db('sientateMesa');
        if (!await database.collection('usersCollectionPrueba')) {
            await database.createCollection('usersCollectionPrueba', {
            validator: {
                $jsonSchema: {
                bsonType: "object",
                required: ["name", "surname", "userName", "password", "email", "phoneNumber", "address"],
                properties: {
                    name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                    },
                    surname: {
                    bsonType: "string",
                    description: "must be a string and is required"
                    },
                    userName: {
                    bsonType: "string",
                    description: "must be a string and is required"
                    },
                    password: {
                    bsonType: "string",
                    description: "must be a string and is required",
                    minLength: 8,
                    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$" // Al menos una minúscula, una mayúscula y un número
                    },
                    email: {
                    bsonType: "string",
                    description: "must be a string and is required",
                    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
                    },
                    phoneNumber: {
                    bsonType: "string",
                    description: "must be a string and is required",
                    pattern: "^\\d{9}$"
                    },
                    address: {
                    bsonType: "string",
                    description: "must be a string and is required"
                    },
                    profilePhoto: {
                    bsonType: ["binData", "null"],
                    description: "must be binary data or null"
                    }
                }
                }
            }
            
        }).then((collection: Collection) => { // Esto es para que resuelva la promesa y luego lo asigne a la colección
            // Asigna la colección a la variable después de que la promesa se resuelve
            usersCollection = collection;
            console.log('Colección de usuarios creada:', usersCollection.collectionName);
            
            // Puedes realizar operaciones con la colección aquí
        });

        // Crea los índices de la colección para que no se puedan repetir los nombres de usuario, email y teléfono
        await usersCollection.createIndex({ userName: 1 }, { unique: true });
        await usersCollection.createIndex({ email: 1 }, { unique: true });
        await usersCollection.createIndex({ phoneNumber: 1 }, { unique: true });

        } else { // En caso de que la colección ya exista no la vuelve a crear
        usersCollection = database.collection('usersCollectionPrueba');
        console.log('Colección de usuarios ya existente:', usersCollection.collectionName); 

        // Crea los índices de la colección para que no se puedan repetir los nombres de usuario, email y teléfono
        await usersCollection.createIndex({ userName: 1 }, { unique: true });
        await usersCollection.createIndex({ email: 1 }, { unique: true });
        await usersCollection.createIndex({ phoneNumber: 1 }, { unique: true });
        }
    } finally {
    //await client.close();
    }
}

export async function createUser(user: userInterface) {
    try {
        await connectToDatabase();
        // Inserta el usuario en la colección (la validación se aplica aquí)
        await usersCollection.insertOne(user);
        console.log('Usuario creado exitosamente.');
        await client.close();
    } catch (error) {
        console.error('Error al crear usuario:', error);
    }
}


// async function run() {
//     await connectToDatabase();
    
//     //const foto: Buffer = fs.readFileSync('src/database/foto-perfil.png');
//     // Ahora puedes llamar a tus funciones que usan usersCollection
//     await createUser({
//       name: 'John',
//       surname: 'Doe',
//       userName: 'johndoe2',
//       password: 'MiContraseña123',
//       email: 'john2@example.es',
//       phoneNumber: '123456787',
//       address: '123 Main St',
//       profilePhoto: null
//     });
  
//     // Otras operaciones...
  
//     // Cierra la conexión cuando hayas terminado
//     await client.close();
//   }

// run().catch(console.dir);

