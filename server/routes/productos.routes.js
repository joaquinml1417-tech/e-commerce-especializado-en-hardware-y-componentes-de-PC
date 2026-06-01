import { Router } from 'express';
import { Producto } from '../models/Producto.js'; 

const router = Router();

router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener productos de MongoDB" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar el producto" });
    }
});

router.post('/', async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json({ mensaje: "Producto guardado en MongoDB", data: nuevoProducto });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al guardar el producto" });
    }
});

export default router;