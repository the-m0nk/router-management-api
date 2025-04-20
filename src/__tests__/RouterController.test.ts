import request from 'supertest';
import express from 'express';
import { routerRoutes } from '../routes/routerRoutes';
import { errorHandler } from '../middleware/errorHandler';

describe('RouterController', () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/router', routerRoutes);
    app.use(errorHandler);
  });

  it('should get router status', async () => {
    const response = await request(app).get('/router/status');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('model', 'RouterModel123');
    expect(response.body).toHaveProperty('firmwareVersion', '1.0.0');
  });

  it('should enable WiFi', async () => {
    const response = await request(app).post('/router/settings/wifi/enable');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'WiFi has been enabled.',
    });
  });

  it('should disable WiFi', async () => {
    const response = await request(app).post('/router/settings/wifi/disable');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'WiFi has been disabled.',
    });
  });

  it('should enable firewall', async () => {
    const response = await request(app).post('/router/settings/firewall/enable');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Firewall has been enabled.',
    });
  });

  it('should disable firewall', async () => {
    const response = await request(app).post('/router/settings/firewall/disable');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Firewall has been disabled.',
    });
  });

  it('should change password with valid input', async () => {
    const response = await request(app)
      .post('/router/settings/password/change')
      .send({ newPassword: 'newSecurePass123' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Password has been changed.',
    });
  });

  it('should fail to change password with invalid input', async () => {
    const response = await request(app)
      .post('/router/settings/password/change')
      .send({ newPassword: 'short' });
    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
  });
});