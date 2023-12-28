/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import {Document, Schema, model} from 'mongoose';
import { RestaurantModel } from '../restaurants/restaurants-models.js';
import { reservationsDocumentInterface } from '../reservations/reservantions-models.js';

export interface userDocumentInterface extends Document{
    name: string;
    surname: string;
    userName: string;
    password: string;
    email: string;
    phoneNumber: string;
    address: string;
    nextReservations: reservationsDocumentInterface[];
    historicReservations: reservationsDocumentInterface[];
    profilePhoto?: string;
}


const UserSchema = new Schema<userDocumentInterface>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
        match: [ /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, 'Password must contain at least one lowercase letter, one uppercase letter and one number' ],
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address' ]
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [ /^\d{9}$/, 'Invalid phone number' ]
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    profilePhoto: {
        type: String   
        
    },
    nextReservations: {
        type: [Schema.Types.ObjectId],
        ref: 'Reservation',
        required: false,
        trim: true
    },
    historicReservations: {
        type: [Schema.Types.ObjectId],
        ref: 'Reservation',
        required: false,
        trim: true
    }
});

export const UserModel = model<userDocumentInterface>('User', UserSchema);

export async function validateUserSchema(user: userDocumentInterface): Promise<{ code: number, errors: string }> {
    const existingUser = await UserModel.findOne({
        $or: [
            { userName: user.userName },
            { email: user.email },
            { phoneNumber: user.phoneNumber }
        ]
    });

    const existingRestaurant = await RestaurantModel.findOne({
        $or: [
            { userName: user.userName },
            { email: user.email },
            { phoneNumber: user.phoneNumber }
        ]
    });


    if (existingUser || existingRestaurant) {
        if (existingUser?.userName === user.userName || existingRestaurant?.userName === user.userName) {
            return { code: 2, errors: 'Ya existe ese nombre de usuario' };
        } else if (existingUser?.email === user.email || existingRestaurant?.email === user.email) {
            return { code: 3, errors: 'Ya existe ese correo electrónico' };
        } else if (existingUser?.phoneNumber === user.phoneNumber || existingRestaurant?.phoneNumber === user.phoneNumber) {
            return { code: 4, errors: 'Ya existe número de teléfono' };
        }
    }

    return { code: 0, errors: '' };
}

export async function validateUserSchemaEdit(user: userDocumentInterface, email: boolean, phoneNumber: boolean): Promise<{ code: number, errors: string }> {
    if (email == true) {
        const existingUser = await UserModel.findOne({ email: user.email });
        const existingRestaurant = await RestaurantModel.findOne({ email: user.email });

        if (existingUser || existingRestaurant) {
            if (existingUser?.email === user.email || existingRestaurant?.email === user.email) {
                return { code: 3, errors: 'Ya existe ese correo electrónico' };
            }
        }
    } else if (phoneNumber == false) {
        const existingUser = await UserModel.findOne({ phoneNumber: user.phoneNumber });
        const existingRestaurant = await RestaurantModel.findOne({ phoneNumber: user.phoneNumber });

        if (existingUser || existingRestaurant) {
            if (existingUser?.phoneNumber === user.phoneNumber || existingRestaurant?.phoneNumber === user.phoneNumber) {
                return { code: 4, errors: 'Ya existe número de teléfono' };
            }
        }
    }

    return { code: 0, errors: '' };
}