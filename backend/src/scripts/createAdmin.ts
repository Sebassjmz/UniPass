import { connectDB } from '../config/db';
import { User } from '../models/User.model';
import mongoose from 'mongoose';

const createAdmin = async () => {
    try {
        await connectDB();

        const adminData = {
            name: 'Admin Principal',
            email: 'admin@unipass.com',
            password: 'admin123',
            matricula: 'ADMIN001',
            role: 'admin',
            status: 'active',
        };

        const existingAdmin = await User.findOne({ email: adminData.email });

        if (existingAdmin) {
            console.log('El admin ya existe');
            process.exit(0);
        }

        const admin = await User.create(adminData);

        console.log('Admin creado exitosamente:');
        console.log(`Email: ${admin.email}`);
        console.log(`Matrícula: ${admin.matricula}`);
        console.log('Password: admin123');

        process.exit(0);
    } catch (error) {
        console.error('Error creando admin:', error);
        process.exit(1);
    }
};

createAdmin();