import { GET } from '../route';

describe('/api/health', () => {
  it('should return health status with correct structure', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('status', 'ok');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('service', 'sidewalks');
    expect(new Date(data.timestamp)).toBeInstanceOf(Date);
  });
});