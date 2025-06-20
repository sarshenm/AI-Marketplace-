import request from 'supertest';
import app from '../api/index';

describe('POST /api/tools/submit', () => {
  it('requires authentication', async () => {
    const res = await request(app).post('/api/tools/submit').send({ prompt: 'test' });
    expect(res.status).toBe(401);
  });
});
