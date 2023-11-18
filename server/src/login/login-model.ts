/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import {Document, Schema, model} from 'mongoose';

interface loginDocumentInterface {

    userName: string;
    password: string;
}


const UserSchema = new Schema<loginDocumentInterface>({
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
    }
});

export const LoginModel = model<loginDocumentInterface>('User', UserSchema);

export async function validateLoginSchema(user: loginDocumentInterface): Promise<{ code: number, errors: string }> {
    const existingUser = await LoginModel.findOne({
        $or: [
            { userName: user.userName },
        ]
    });

    // Sino existe un usuario con el mismo nombre de usuario, se devuelve un código de error
    if (!existingUser) {
        return { code: 1, errors: 'No existe un usuario con ese nombre de usuario' };
    }
    
    return { code: 0, errors: '' };
}