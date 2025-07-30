import request from 'supertest';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const createTestApp = () => {
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
    app = createTestApp();
  });

  it('should return health status from Express API', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
  });
});