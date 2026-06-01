import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hardwareStore');
        console.log(`💾 MongoDB Conectado con éxito: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error crítico de conexión a la Base de Datos: ${error.message}`);
        process.exit(1); 
    }
};