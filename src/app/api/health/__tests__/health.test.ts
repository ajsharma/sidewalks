import { GET } from '../route'

// Unit Testing for Next.js 15 App Router API Routes
// Testing API route handlers in Node.js environment
describe('/api/health Route Handler', () => {
  describe('GET Request', () => {
    it('returns correct response structure', async () => {
      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual({
        status: 'ok',
        timestamp: expect.any(String),
        service: 'sidewalks'
      })
    })

    it('includes appropriate headers', async () => {
      const response = await GET()
      
      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('returns valid ISO timestamp', async () => {
      const response = await GET()
      const data = await response.json()
      
      const timestamp = new Date(data.timestamp)
      expect(timestamp.toISOString()).toBe(data.timestamp)
      expect(timestamp.getTime()).toBeLessThanOrEqual(Date.now())
    })
  })

  describe('Response Validation', () => {
    it('maintains consistent service identifier', async () => {
      const response = await GET()
      const data = await response.json()
      
      expect(data.service).toBe('sidewalks')
    })

    it('returns success status', async () => {
      const response = await GET()
      const data = await response.json()
      
      expect(data.status).toBe('ok')
    })
  })
})