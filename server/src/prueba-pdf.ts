import mongoose, { Document, Schema } from 'mongoose';
import fs from 'fs';

// Conéctate a la base de datos
mongoose.connect('mongodb://localhost/tu_base_de_datos', { useNewUrlParser: true, useUnifiedTopology: true });

// Define el esquema del establecimiento
interface EstablishmentDocument extends Document {
    name: string;
    pdfDocument: {
        data: Buffer;
        contentType: string;
    };
}

const establishmentSchema = new Schema<EstablishmentDocument>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    pdfDocument: {
        data: Buffer,
        contentType: String,
    },
});

const Establishment = mongoose.model<EstablishmentDocument>('Establishment', establishmentSchema);

// Ejemplo de cómo guardar un PDF en la base de datos
const nuevoEstablecimiento = new Establishment({
    name: 'Nombre del establecimiento',
    pdfDocument: {
        data: fs.readFileSync('ruta_al_archivo.pdf'),  // Lee el contenido del PDF en formato binario
        contentType: 'application/pdf',
    },
});

nuevoEstablecimiento.save((error, establecimientoGuardado) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Establecimiento guardado:', establecimientoGuardado);

        // Recuperar el PDF y guardarlo en un directorio
        const pdfBuffer = establecimientoGuardado.pdfDocument.data;
        const contentType = establecimientoGuardado.pdfDocument.contentType;

        const fileName = `documento_${Date.now()}.pdf`;
        const filePath = `./pdfs/${fileName}`;

        fs.writeFileSync(filePath, pdfBuffer, 'binary');
        console.log(`PDF guardado en: ${filePath}`);
    }

    // Cierra la conexión después de realizar las operaciones
    mongoose.connection.close();
});
