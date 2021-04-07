const App = require('../app');
const supertest = require('supertest');
const admin = require('firebase-admin');

jest.mock('firebase-admin',() => ({
  auth: jest.fn().mockReturnValue({ verifyIdToken: jest.fn()}),
  credential: {
    applicationDefault: jest.fn()
  },
  initializeApp: jest.fn()
}))

describe('Auth middleware', () => {
  const app = App.initialize()
  it("returns 401 when there is no authorization header", async () => {
    const response = await supertest(app)
      .get('/api/fake')
      .expect(401)
    expect(response.body).toMatchObject({ message: "No token provided" });
  })
  it('returns 401 when the token is not a bearer token', async ()=>{
    const response = await supertest(app)
      .get("/api/fake")
      .set('Authorization','Token faketoken')
      .expect(401);
    expect(response.body).toMatchObject({ message: "Invalid token" });
  })
  it('returns 403 when an invalid token is passed',async () => {
    admin.auth().verifyIdToken.mockRejectedValue();
    const response = await supertest(app)
      .get("/api/fake")
      .set("Authorization", "Bearer faketoken")
      .expect(403);
    expect(response.body).toMatchObject({ message: "Could not authorize" });

  })
})


