import { Router } from 'express';
import { body, param } from 'express-validator';
import { AdminController } from '../controllers/admin.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/roleCheck.middleware';
import { validate } from '../middlewares/validator.middleware';

const router = Router();

router.use(authenticate, isAdmin);

router.get('/users', AdminController.getAllUsers);

router.get(
    '/users/:userId',
    validate([
        param('userId').isMongoId().withMessage('ID de usuario inválido'),
    ]),
    AdminController.getUserById
);

router.put(
    '/users/:userId',
    validate([
        param('userId').isMongoId().withMessage('ID de usuario inválido'),
        body('name').optional().trim().notEmpty(),
        body('email').optional().isEmail().withMessage('Email inválido'),
        body('phone').optional().trim(),
        body('status').optional().isIn(['active', 'inactive', 'suspended']),
        body('role').optional().isIn(['student', 'guard', 'admin']),
    ]),
    AdminController.updateUser
);

router.delete(
    '/users/:userId',
    validate([
        param('userId').isMongoId().withMessage('ID de usuario inválido'),
    ]),
    AdminController.deleteUser
);

router.get('/stats', AdminController.getAccessStats);

router.get('/logs', AdminController.getAllAccessLogs);

router.get('/active-codes', AdminController.getActiveCodes);

export default router;