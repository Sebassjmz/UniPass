import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validator.middleware';
import { loginLimiter } from '../middlewares/rateLimit.middleware';

const router = Router();

router.post(
    '/register',
    validate([
        body('name').trim().notEmpty().withMessage('El nombre es requerido'),
        body('email').isEmail().withMessage('Email inválido'),
        body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
        body('matricula').trim().notEmpty().withMessage('La matrícula es requerida'),
        body('role').optional().isIn(['student', 'guard', 'admin']).withMessage('Rol inválido'),
    ]),
    AuthController.register
);

router.post(
    '/login',
    loginLimiter,
    validate([
        body('email').isEmail().withMessage('Email inválido'),
        body('password').notEmpty().withMessage('La contraseña es requerida'),
    ]),
    AuthController.login
);

router.get('/me', authenticate, AuthController.getMe);

export default router;