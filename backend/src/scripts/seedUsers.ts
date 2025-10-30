import { connectDB } from '../config/db';
import { User } from '../models/User.model';
import mongoose from 'mongoose';

const seedUsers = async () => {
    try {
        await connectDB();

        const users = [
            {
                name: 'Juan Estudiante',
                email: 'juan@student.com',
                password: 'password123',
                matricula: 'EST001',
                role: 'student',
                status: 'active',
            },
            {
                name: 'María Estudiante',
                email: 'maria@student.com',
                password: 'password123',
                matricula: 'EST002',
                role: 'student',
                status: 'active',
            },
            {
                name: 'Pedro Guardia',
                email: 'pedro@guard.com',
                password: 'password123',
                matricula: 'GUARD001',
                role: 'guard',
                status: 'active',
            },
            {
                name: 'Ana Guardia',
                email: 'ana@guard.com',
                password: 'password123',
                matricula: 'GUARD002',
                role: 'guard',
                status: 'active',
            },
        ];

        for (const userData of users) {
            const existingUser = await User.findOne({ email: userData.email });
            if (!existingUser) {
                await User.create(userData);
                console.log(`Usuario creado: ${userData.name} (${userData.email})`);
            } else {
                console.log(`Usuario ya existe: ${userData.email}`);
            }
        }

        console.log('Seed completado');
        process.exit(0);
    } catch (error) {
        console.error('Error en seed:', error);
        process.exit(1);
    }
};

seedUsers();