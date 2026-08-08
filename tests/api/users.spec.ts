import { test, expect } from '@playwright/test';

/**
 * API test coverage for the JSONPlaceholder public test API.
 * Demonstrates request/response validation, status codes, schema checks,
 * and negative-path testing without any browser involved.
 *
 * Note: JSONPlaceholder fakes writes (POST/PUT/DELETE) — it echoes back a
 * plausible response but doesn't persist changes. That's expected and is
 * exactly what makes it safe for repeated CI runs.
 */
test.describe('Users API', () => {
  test('GET /users/2 returns a valid user object', async ({ request }) => {
    const response = await request.get('/users/2');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject({
      id: 2,
      email: expect.stringContaining('@'),
      name: expect.any(String),
      username: expect.any(String),
    });
  });

  test('GET /users/9999 (nonexistent) returns 404', async ({ request }) => {
    const response = await request.get('/users/9999');
    expect(response.status()).toBe(404);
  });

  test('GET /users returns the full list of users', async ({ request }) => {
    const response = await request.get('/users');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('email');
  });

  test('POST /users creates a new user', async ({ request }) => {
    const response = await request.post('/users', {
      data: { name: 'Priya Anand', job: 'QA Automation Engineer' },
    });
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe('Priya Anand');
    expect(body.job).toBe('QA Automation Engineer');
    expect(body.id).toBeDefined();
  });

  test('PUT /users/2 updates an existing user', async ({ request }) => {
    const response = await request.put('/users/2', {
      data: { name: 'Priya Anand', job: 'SDET' },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.job).toBe('SDET');
  });

  test('DELETE /users/2 removes a user', async ({ request }) => {
    const response = await request.delete('/users/2');
    expect(response.status()).toBe(200);
  });
});
