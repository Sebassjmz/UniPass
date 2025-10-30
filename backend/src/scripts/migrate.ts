import { connectDB } from '../config/db';
import mongoose from 'mongoose';

const migrate = async () => {
    try {
        await connectDB();

        console.log('Ejecutando migraciones...');

        // Aquí puedes agregar migraciones futuras si es necesario

        console.log('Migraciones completadas');
        process.exit(0);
    } catch (error) {
        console.error('Error en migración:', error);
        process.exit(1);
    }
};

migrate();