import { Router } from 'express';
import { body } from 'express-validator';
import { GuardController } from '../controllers/guard.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { isGuardOrAdmin } from '../middlewares/roleCheck.middleware';
import { validate } from '../middlewares/validator.middleware';
import { verifyCodeLimiter } from '../middlewares/rateLimit.middleware';

const router = Router();

router.use(authenticate, isGuardOrAdmin);

router.post(
    '/verify',
    verifyCodeLimiter,
    validate([
        body('code').trim().notEmpty().withMessage('El código es requerido'),
        body('matricula').trim().notEmpty().withMessage('La matrícula es requerida'),
        body('location').optional().trim(),
    ]),
    GuardController.verifyCode
);

router.get('/search', GuardController.searchStudent);

router.get('/recent', GuardController.getRecentVerifications);

router.post(
    '/manual-entry',
    validate([
        body('matricula').trim().notEmpty().withMessage('La matrícula es requerida'),
        body('action').isIn(['entry', 'exit']).withMessage('Acción inválida'),
        body('location').optional().trim(),
        body('reason').optional().trim(),
    ]),
    GuardController.manualEntry
);

router.post(
    '/report-incident',
    validate([
        body('matricula').trim().notEmpty().withMessage('La matrícula es requerida'),
        body('reason').trim().notEmpty().withMessage('La razón es requerida'),
        body('location').optional().trim(),
    ]),
    GuardController.reportIncident
);

export default router;