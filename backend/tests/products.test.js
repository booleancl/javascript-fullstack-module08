const App = require("../app");
const Models = require('../models');
const supertest = require("supertest");
const admin = require("firebase-admin");
const products = require("../../fixtures/products.json")
  jest.mock("firebase-admin", () => ({
    auth: jest.fn().mockReturnValue({ verifyIdToken: jest.fn() }),
    credential: {
      applicationDefault: jest.fn(),
    },
    initializeApp: jest.fn(),
  }));

describe('/api/products',()=>{

  const app = App.initialize();
  beforeAll(async ()=>{
    await Models.sequelize.sync({force: true})
    await Models.Product.bulkCreate(products)
  })

  it('returns an array of products', async ()=>{
    admin.auth().verifyIdToken.mockResolvedValue(true);
    const response = await supertest(app)
      .get("/api/products")
      .set("Authorization", "Bearer faketoken")
      .expect(200);
    expect(response.body).toMatchObject(products);    
  })

  afterAll(async ()=>{
    await Models.sequelize.close();
  })
})