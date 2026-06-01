import { Router } from 'express';
import { Venta } from '../models/Venta.js';
import { verificarToken } from '../middleware/auth.js';

const router = Router();

router.post('/comprar', verificarToken, async (req, res) => {
    try {
        const { productos, total } = req.body;
        const usuarioToken = req.usuarioLogueado; 

        if (!productos || productos.length === 0) {
            return res.status(400).json({ error: "Carrito vacío." });
        }

        const nuevaOrden = new Venta({
            id_usuario: usuarioToken.id,
            nombre_usuario: usuarioToken.nombre,
            fecha: new Date().toISOString().split('T')[0],
            productos: productos,
            total: total
        });

        await nuevaOrden.save();
        res.status(201).json({ mensaje: "¡Compra exitosa!", ordenId: nuevaOrden._id });

 
} catch (error) {
    console.error("Error técnico:", error); 
    res.status(500).json({ error: error.message }); 
}
});

export default router;