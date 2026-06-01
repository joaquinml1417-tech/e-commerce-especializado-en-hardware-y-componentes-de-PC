import mongoose from 'mongoose';

const ventaSchema = new mongoose.Schema({
    id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    nombre_usuario: { type: String, required: true },
    fecha: { type: String, required: true },
    productos: [
        {
            id_producto: { type: String, required: true },
            cantidad: { type: Number, default: 1 }
        }
    ],
    total: { type: Number, required: true }
}, { timestamps: true });

export const Venta = mongoose.model('Venta', ventaSchema);