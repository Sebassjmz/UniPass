import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || '');

        console.log(`MongoDB conectado: ${conn.connection.host}`);

        mongoose.connection.on('error', (err) => {
            console.error('Error en MongoDB:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠MongoDB desconectado');
        });

    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1);
    }
};