import supertest from 'supertest';
import app from '../src/app'; 
import { User } from '../src/model/UserModel';

beforeEach(async () => {
  await User.create({ name: "Test_User", email: "test@example.com", password: "testPassword123", confirmPassword: "testPassword123" });
});

afterEach(async () => {
  await User.deleteMany({});
});

test('Login with valid credentials should return status 200', async () => {
  const response = await supertest(app)
    .post('/api/login')
    .send({ email: "test@example.com", password: "testPassword123" }); // Ändern Sie die E-Mail und das Passwort entsprechend Ihren Testdaten
  expect(response.status).toBe(200);
  // Hier können Sie weitere Assertions hinzufügen, um sicherzustellen, dass die Antwort korrekt ist
});

test('Login with invalid credentials should return status 401', async () => {
  const response = await supertest(app)
    .post('/api/login')
    .send({ email: 'invalid@example.com', password: 'invalidpassword' }); // Ändern Sie die E-Mail und das Passwort entsprechend Ihren Testdaten
  expect(response.status).toBe(401);
  // Hier können Sie weitere Assertions hinzufügen, um sicherzustellen, dass die Antwort korrekt ist
});

test('Login with missing credentials should return status 400', async () => {
  const response = await supertest(app)
    .post('/api/login')
    .send({ email: '', password: '' }); // Senden Sie leere Werte für email und password
  expect(response.status).toBe(400);
  // Hier können Sie weitere Assertions hinzufügen, um sicherzustellen, dass die Antwort korrekt ist
});