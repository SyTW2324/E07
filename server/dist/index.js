/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */
import { app } from './app.js';
const port = 5173;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
