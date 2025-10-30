import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { errorHandler, notFound } from './middlewares/error.middleware';
import { generalLimiter } from './middlewares/rateLimit.middleware';

import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';
import guardRoutes from './routes/guard.routes';
import adminRoutes from './routes/admin.routes';

const app: Application = express();

// Middlewares de seguridad
app.use(helmet());
app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true,
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger simple sin morgan
if (env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
}

// Rate limiting general
app.use(generalLimiter);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/guard', guardRoutes);
app.use('/api/admin', adminRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;