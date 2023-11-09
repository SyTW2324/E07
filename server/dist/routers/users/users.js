/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */
import express from 'express';
export const usersRouter = express.Router();
usersRouter.post('/users', async (req, res) => {
    try {
        return res.status(200).send("Hola post");
    }
    catch (error) {
        return res.status(500).send({
            error: error.message,
            stack: error.stack
        });
    }
});
usersRouter.get('/users', async (req, res) => {
    const filter = req.query.name ? { name: req.query.name.toString() } : {};
    try {
        return res.status(200).send("Hola get");
    }
    catch {
        return res.status(500).send();
    }
});
