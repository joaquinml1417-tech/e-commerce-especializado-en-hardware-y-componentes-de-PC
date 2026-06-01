import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    imagen: { type: String },
    desc: { type: String },
    categoria: { type: String }
});

export const Producto = mongoose.model('Producto', productoSchema);