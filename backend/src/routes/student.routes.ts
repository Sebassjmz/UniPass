import { Router } from 'express';
import { body } from 'express-validator';
import { StudentController } from '../controllers/student.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { isStudent } from '../middlewares/roleCheck.middleware';
import { validate } from '../middlewares/validator.middleware';

const router = Router();

router.use(authenticate, isStudent);

router.get('/profile', StudentController.getProfile);

router.put(
    '/profile',
    validate([
        body('name').optional().trim().notEmpty().withMessage('El nombre no puede estar vacío'),
        body('phone').optional().trim(),
        body('photoUrl').optional().isURL().withMessage('URL de foto inválida'),
    ]),
    StudentController.updateProfile
);

router.post(
    '/generate-code',
    validate([
        body('location').optional().trim(),
    ]),
    StudentController.generateAccessCode
);

router.get('/history', StudentController.getAccessHistory);

router.get('/stats', StudentController.getStats);

export default router;