import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../../backend/src/app';
import { connectDB } from '../../backend/src/config/db';
import { User } from '../../backend/src/models/User.model';
import mongoose from 'mongoose';

describe('Student Tests', () => {
    let studentToken: string;
    let studentId: string;

    beforeAll(async () => {
        await connectDB();

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Student Profile Test',
                email: 'student.profile@test.com',
                password: 'password123',
                matricula: 'STU002',
                role: 'student',
            });

        studentToken = response.body.data.token;
        studentId = response.body.data.user.id;
    });

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    describe('GET /api/student/profile', () => {
        it('should get student profile', async () => {
            const response = await request(app)
                .get('/api/student/profile')
                .set('Authorization', `Bearer ${studentToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.email).toBe('student.profile@test.com');
            expect(response.body.data.role).toBe('student');
        });

        it('should fail without authentication', async () => {
            const response = await request(app)
                .get('/api/student/profile');

            expect(response.status).toBe(401);
        });
    });

    describe('PUT /api/student/profile', () => {
        it('should update student profile', async () => {
            const response = await request(app)
                .put('/api/student/profile')
                .set('Authorization', `Bearer ${studentToken}`)
                .send({
                    name: 'Updated Name',
                    phone: '1234567890',
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe('Updated Name');
            expect(response.body.data.phone).toBe('1234567890');
        });

        it('should not update with invalid data', async () => {
            const response = await request(app)
                .put('/api/student/profile')
                .set('Authorization', `Bearer ${studentToken}`)
                .send({
                    name: '',
                });

            expect(response.status).toBe(400);
        });
    });

    describe('GET /api/student/stats', () => {
        it('should get student stats', async () => {
            const response = await request(app)
                .get('/api/student/stats')
                .set('Authorization', `Bearer ${studentToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.totalAccess).toBeDefined();
            expect(response.body.data.denied).toBeDefined();
            expect(response.body.data.todayAccess).toBeDefined();
        });
    });
});