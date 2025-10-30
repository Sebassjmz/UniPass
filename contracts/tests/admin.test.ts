import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../../backend/src/app';
import { connectDB } from '../../backend/src/config/db';
import { User } from '../../backend/src/models/User.model';
import mongoose from 'mongoose';

describe('Admin Tests', () => {
    let adminToken: string;
    let testUserId: string;

    beforeAll(async () => {
        await connectDB();

        const admin = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Admin Test',
                email: 'admin.test@test.com',
                password: 'password123',
                matricula: 'ADM001',
                role: 'admin',
            });

        adminToken = admin.body.data.token;

        const testUser = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User For Admin',
                email: 'testuser@test.com',
                password: 'password123',
                matricula: 'TST001',
                role: 'student',
            });

        testUserId = testUser.body.data.user.id;
    });

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    describe('GET /api/admin/users', () => {
        it('should get all users', async () => {
            const response = await request(app)
                .get('/api/admin/users')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThan(0);
        });

        it('should filter users by role', async () => {
            const response = await request(app)
                .get('/api/admin/users?role=student')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.data.every((u: any) => u.role === 'student')).toBe(true);
        });

        it('should filter users by status', async () => {
            const response = await request(app)
                .get('/api/admin/users?status=active')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.data.every((u: any) => u.status === 'active')).toBe(true);
        });

        it('should search users', async () => {
            const response = await request(app)
                .get('/api/admin/users?search=Test')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.data.length).toBeGreaterThan(0);
        });
    });

    describe('GET /api/admin/users/:userId', () => {
        it('should get user by id', async () => {
            const response = await request(app)
                .get(`/api/admin/users/${testUserId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data._id).toBe(testUserId);
        });

        it('should fail with invalid user id', async () => {
            const response = await request(app)
                .get('/api/admin/users/invalid-id')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(400);
        });
    });

    describe('PUT /api/admin/users/:userId', () => {
        it('should update user', async () => {
            const response = await request(app)
                .put(`/api/admin/users/${testUserId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    name: 'Updated Test User',
                    status: 'inactive',
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe('Updated Test User');
            expect(response.body.data.status).toBe('inactive');
        });

        it('should change user role', async () => {
            const response = await request(app)
                .put(`/api/admin/users/${testUserId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    role: 'guard',
                });

            expect(response.status).toBe(200);
            expect(response.body.data.role).toBe('guard');
        });
    });

    describe('DELETE /api/admin/users/:userId', () => {
        it('should delete user', async () => {
            const newUser = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'User To Delete',
                    email: 'delete@test.com',
                    password: 'password123',
                    matricula: 'DEL001',
                });

            const response = await request(app)
                .delete(`/api/admin/users/${newUser.body.data.user.id}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });
    });

    describe('GET /api/admin/stats', () => {
        it('should get access stats', async () => {
            const response = await request(app)
                .get('/api/admin/stats')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.totalAccess).toBeDefined();
            expect(response.body.data.successfulAccess).toBeDefined();
            expect(response.body.data.deniedAccess).toBeDefined();
        });

        it('should filter stats by date', async () => {
            const response = await request(app)
                .get('/api/admin/stats?startDate=2025-01-01&endDate=2025-12-31')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
        });
    });

    describe('GET /api/admin/logs', () => {
        it('should get all access logs', async () => {
            const response = await request(app)
                .get('/api/admin/logs')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should filter logs by action', async () => {
            const response = await request(app)
                .get('/api/admin/logs?action=entry')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
        });
    });

    describe('GET /api/admin/active-codes', () => {
        it('should get active codes', async () => {
            const response = await request(app)
                .get('/api/admin/active-codes')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });
});