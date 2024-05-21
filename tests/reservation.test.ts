import supertest from 'supertest';
import app from '../src/app'; 
import { User } from '../src/model/UserModel';

describe('Registration Endpoint Tests', () => {
  beforeEach(async () => {
    // Vor jedem Test einen Benutzer erstellen
    await User.create({ 
      name: "TestUser", 
      lastName: "TestLastName",
      age: 25,
      email: "test@example.com", 
      password: "testPassword123", 
      confirmPassword: "testPassword123" 
    });
  });

  afterEach(async () => {
    // Nach jedem Test alle Benutzer löschen
    await User.deleteMany({});
  });
  test('Register a new user with valid data should return status 200', async () => {
    const response = await supertest(app)
      .post('/api/register')
      .send({ 
        name: "New_User", 
        email: "newuser@example.com", // Neue E-Mail-Adresse verwenden
        password: "newTestPassword123", 
        confirmPassword: "newTestPassword123" 
      }); 
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Registration successful');
  });
  
  test('Registering a user with existing email should return status 400', async () => {
    const response = await supertest(app)
      .post('/api/register') // Hier den richtigen Pfad verwenden
      .send({ 
        name: "Test_User", 
        email: "test@example.com", // Verwenden Sie eine vorhandene E-Mail-Adresse
        password: "testPassword123", 
        confirmPassword: "testPassword123" 
      }); 
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email already exists');
  });
  

  
});
