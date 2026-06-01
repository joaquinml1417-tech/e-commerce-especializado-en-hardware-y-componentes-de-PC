import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: [true, 'El nombre es obligatorio'] 
    },
    apellido: { 
        type: String, 
        required: [true, 'El apellido es obligatorio'] 
    },
    email: { 
        type: String, 
        required: [true, 'El email es obligatorio'], 
        unique: true,
        lowercase: true
    },
    password: { 
        type: String, 
        required: [true, 'La contraseña es obligatoria'] 
    },
    premium: { 
        type: Boolean, 
        default: false 
    }
}, { 
    timestamps: true  
});

export const Usuario = mongoose.model('Usuario', usuarioSchema);