import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario.js';
import { verificarToken } from '../middleware/auth.js'; 

const router = Router();

router.post('/registro', async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body;
        const usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) return res.status(400).json({ error: "Correo registrado." });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const nuevoUsuario = new Usuario({ nombre, apellido, email, password: hashedPassword });

        await nuevoUsuario.save();
        res.status(201).json({ mensaje: "Usuario registrado" });
    } catch (error) {
        res.status(500).json({ error: "Error interno." });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(400).json({ error: "Credenciales inválidas." });

        const contraseniaValida = await bcrypt.compare(password, usuario.password);
        if (!contraseniaValida) return res.status(400).json({ error: "Credenciales inválidas." });

        const token = jwt.sign(
    { id: usuario._id, nombre: usuario.nombre, email: usuario.email },
    'mi_clave_secreta_super_segura', 
    { expiresIn: '2h' }
);

        res.status(200).json({ token, usuario: usuario.nombre });
    } catch (error) {
        res.status(500).json({ error: "Error interno." });
    }
});

export default router;