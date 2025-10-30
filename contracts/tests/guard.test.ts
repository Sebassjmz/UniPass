import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../../backend/src/app';
import { connectDB } from '../../backend/src/config/db';
import { User } from '../../backend/src/models/User.model';
import mongoose from 'mongoose';

describe('Guard Tests', () => {
    let guardToken: string;
    let studentMatricula: string;

    beforeAll(async () => {
        await connectDB();

        const guard = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Guard Full Test',
                email: 'guard.full@test.com',
                password: 'password123',
                matricula: 'GRD002',
                role: 'guard',
            });

        guardToken = guard.body.data.token;

        const student = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Student For Guard',
                email: 'student.guard@test.com',
                password: 'password123',
                matricula: 'STU003',
                role: 'student',
            });

        studentMatricula = student.body.data.user.matricula;
    });

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    describe('GET /api/guard/search', () => {
        it('should search students by name', async () => {
            const response = await request(app)
                .get('/api/guard/search?search=Student')
                .set('Authorization', `Bearer ${guardToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should search students by matricula', async () => {
            const response = await request(app)
                .get('/api/guard/search?search=STU')
                .set('Authorization', `Bearer ${guardToken}`);

            expect(response.status).toBe(200);
            expect(response.body.data.length).toBeGreaterThan(0);
        });

        it('should fail without search parameter', async () => {
            const response = await request(app)
                .get('/api/guard/search')
                .set('Authorization', `Bearer ${guardToken}`);

            expect(response.status).toBe(400);
        });
    });

    describe('POST /api/guard/manual-entry', () => {
        it('should create manual entry', async () => {
            const response = await request(app)
                .post('/api/guard/manual-entry')
                .set('Authorization', `Bearer ${guardToken}`)
                .send({
                    matricula: studentMatricula,
                    action: 'entry',
                    location: 'Edificio B',
                    reason: 'Olvidó código',
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.student).toBeDefined();
        });

        it('should create manual exit', async () => {
            const response = await request(app)
                .post('/api/guard/manual-entry')
                .set('Authorization', `Bearer ${guardToken}`)
                .send({
                    matricula: studentMatricula,
                    action: 'exit',
                    location: 'Edificio B',
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should fail with invalid action', async () => {
            const response = await request(app)
                .post('/api/guard/manual-entry')
                .set('Authorization', `Bearer ${guardToken}`)
                .send({
                    matricula: studentMatricula,
                    action: 'invalid',
                });

            expect(response.status).toBe(400);
        });
    });

    describe('POST /api/guard/report-incident', () => {
        it('should report incident', async () => {
            const response = await request(app)
                .post('/api/guard/report-incident')
                .set('Authorization', `Bearer ${guardToken}`)
                .send({
                    matricula: studentMatricula,
                    reason: 'Intento de acceso no autorizado',
                    location: 'Puerta principal',
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should fail without reason', async () => {
            const response = await request(app)
                .post('/api/guard/report-incident')
                .set('Authorization', `Bearer ${guardToken}`)
                .send({
                    matricula: studentMatricula,
                });

            expect(response.status).toBe(400);
        });
    });

    describe('GET /api/guard/recent', () => {
        it('should get recent verifications', async () => {
            const response = await request(app)
                .get('/api/guard/recent')
                .set('Authorization', `Bearer ${guardToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should limit results', async () => {
            const response = await request(app)
                .get('/api/guard/recent?limit=5')
                .set('Authorization', `Bearer ${guardToken}`);

            expect(response.status).toBe(200);
            expect(response.body.data.length).toBeLessThanOrEqual(5);
        });
    });
});