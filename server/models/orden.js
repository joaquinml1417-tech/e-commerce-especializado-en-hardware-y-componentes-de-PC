import mongoose from 'mongoose';

const ordenSchema = new mongoose.Schema({
    usuario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    productos: [{
        id_producto: { type: mongoose.Schema.Types.ObjectId, required: true },
        cantidad: { type: Number, default: 1 }
    }],
    total: { type: Number, required: true }
}, { timestamps: true });

export const Orden = mongoose.model('Orden', ordenSchema);