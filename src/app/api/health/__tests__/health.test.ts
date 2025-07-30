import { NextRequest } from 'next/server';
import { GET } from '../route';

describe('GET /api/health', () => {
  it('should return health status with correct structure', async () => {
    const request = new NextRequest('http://localhost:3000/api/health');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      status: 'ok',
      timestamp: expect.any(String),
      service: 'sidewalks'
    });
    expect(new Date(data.timestamp)).toBeInstanceOf(Date);
  });

  it('should include proper content-type header', async () => {
    const request = new NextRequest('http://localhost:3000/api/health');
    const response = await GET(request);

    expect(response.headers.get('content-type')).toContain('application/json');
  });

  it('should return valid ISO timestamp', async () => {
    const request = new NextRequest('http://localhost:3000/api/health');
    const response = await GET(request);
    const data = await response.json();

    const timestamp = new Date(data.timestamp);
    expect(timestamp.toISOString()).toBe(data.timestamp);
  });
});