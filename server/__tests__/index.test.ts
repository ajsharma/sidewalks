import request from 'supertest';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Create the same app configuration as the actual server
const createApp = () => {
  const app = express();
  
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  return app;
};

describe('Express Server', () => {
  let app: express.Application;

  beforeAll(() => {
    app = createApp();
  });

  describe('GET /api/health', () => {
    it('should return health status with correct structure', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toEqual({
        status: 'ok',
        timestamp: expect.any(String)
      });
    });

    it('should return valid ISO timestamp', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      const timestamp = new Date(response.body.timestamp);
      expect(timestamp.toISOString()).toBe(response.body.timestamp);
    });

    it('should include security headers from helmet', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.headers).toHaveProperty('x-content-type-options');
      expect(response.headers).toHaveProperty('x-frame-options');
    });

    it('should handle CORS preflight request', async () => {
      await request(app)
        .options('/api/health')
        .expect(204);
    });
  });

  describe('Error handling', () => {
    it('should return 404 for unknown routes', async () => {
      await request(app)
        .get('/api/unknown')
        .expect(404);
    });
  });
});