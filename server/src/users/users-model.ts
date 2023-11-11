/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import {Document, Schema, model} from 'mongoose';

interface userDocumentInterface {
    name: string;
    surname: string;
    userName: string;
    password: string;
    email: string;
    phoneNumber: string;
    address: string;
    profilePhoto?: Buffer | null; // Buffer para almacenar los datos binarios de la foto de perfil
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
        type: Buffer
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

    if (existingUser) {
        if (existingUser.userName === user.userName) {
            return { code: 2, errors: 'Ya existe un usuario con ese nombre de usuario' };
        } else if (existingUser.email === user.email) {
            return { code: 3, errors: 'Ya existe un usuario con ese correo electrónico' };
        } else if (existingUser.phoneNumber === user.phoneNumber) {
            return { code: 4, errors: 'Ya existe un usuario con ese número de teléfono' };
        }
    }

    return { code: 0, errors: '' };
}