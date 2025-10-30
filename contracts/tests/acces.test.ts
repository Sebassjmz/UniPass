import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../../backend/src/app';
import { connectDB } from '../../backend/src/config/db';
import { User } from '../../backend/src/models/User.model';
import { AccessCode } from '../../backend/src/models/AccesCode.model';
import mongoose from 'mongoose';

describe('Access Code Tests', () => {
    let studentToken: string;
    let guardToken: string;
    let studentMatricula: string;

    beforeAll(async () => {
        await connectDB();

        const student = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Student Test',
                email: 'student@test.com',
                password: 'password123',
                matricula: 'STU001',
                role: 'student',
            });

        studentToken = student.body.data.token;
        studentMatricula = student.body.data.user.matricula;

        const guard = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Guard Test',
                email: 'guard@test.com',
                password: 'password123',
                matricula: 'GRD001',
                role: 'guard',
            });

        guardToken = guard.body.data.token;
    });

    afterAll(async () => {
        await User.deleteMany({});
        await AccessCode.deleteMany({});
        await mongoose.connection.close();
    });

    describe('POST /api/student/generate-code', () => {
        it('should generate a valid access code', async () => {
            const response = await request(app)
                .post('/api/student/generate-code')
                .set('Authorization', `Bearer ${studentToken}`)
                .send({ location: 'Edificio A' });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data.code).toBeDefined();
            expect(response.body.data.code.length).toBe(6);
            expect(response.body.data.expiresAt).toBeDefined();
        });

        it('should invalidate previous codes when generating new one', async () => {
            const first = await request(app)
                .post('/api/student/generate-code')
                .set('Authorization', `Bearer ${studentToken}`);

            const second = await request(app)
                .post('/api/student/generate-code')
                .set('Authorization', `Bearer ${studentToken}`);

            expect(second.status).toBe(201);
            expect(first.body.data.code).not.toBe(second.body.data.code);
        });

        it('should fail without authentication', async () => {
            const response = await request(app)
                .post('/api/student/generate-code');

            expect(response.status).toBe(401);
        });
    });

    describe('POST /api/guard/verify', () => {
        let validCode: string;

        beforeAll(async () => {
            const response = await request(app)
                .post('/api/student/generate-code')
                .set('Authorization', `Bearer ${studentToken}`);

            validCode = response.body.data.code;
        });

        it('should verify a valid access code', async () => {
            const response = await request(app)
                .post('/api/guard/verify')
                .set('Authorization', `Bearer ${guardToken}`)
                .send({
                    code: validCode,
                    matricula: studentMatricula,
                    location: 'Edificio A',
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBeDefined();
        });

        it('should reject a used code', async () => {
            const response = await request(app)
                .post('/api/guard/verify')
                .set('Authorization', `Bearer ${guardToken}`)
                .send({
                    code: validCode,
                    matricula: studentMatricula,
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should reject an incorrect code', async () => {
            const response = await request(app)
                .post('/api/guard/verify')
                .set('Authorization', `Bearer ${guardToken}`)
                .send({
                    code: '000000',
                    matricula: studentMatricula,
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should reject code with wrong matricula', async () => {
            const newCode = await request(app)
                .post('/api/student/generate-code')
                .set('Authorization', `Bearer ${studentToken}`);

            const response = await request(app)
                .post('/api/guard/verify')
                .set('Authorization', `Bearer ${guardToken}`)
                .send({
                    code: newCode.body.data.code,
                    matricula: 'WRONG123',
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /api/student/history', () => {
        it('should get access history', async () => {
            const response = await request(app)
                .get('/api/student/history')
                .set('Authorization', `Bearer ${studentToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should limit history results', async () => {
            const response = await request(app)
                .get('/api/student/history?limit=5')
                .set('Authorization', `Bearer ${studentToken}`);

            expect(response.status).toBe(200);
            expect(response.body.data.length).toBeLessThanOrEqual(5);
        });
    });
});