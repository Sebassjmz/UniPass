import app from './app';
import { env } from './config/env';
import { connectDB } from './config/db';

const startServer = async () => {
    try {
        await connectDB();

        app.listen(env.PORT, () => {
            console.log(`Server corriendo en puerto ${env.PORT}`);
            console.log(`Ambiente: ${env.NODE_ENV}`);
            console.log(`Frontend URL: ${env.FRONTEND_URL}`);
        });
    } catch (error) {
        console.error('Error iniciando el servidor:', error);
        process.exit(1);
    }
};

startServer();

process.on('unhandledRejection', (err: Error) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});

process.on('uncaughtException', (err: Error) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});