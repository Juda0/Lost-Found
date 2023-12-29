let a = 1;

describe("No tests", () => {

  test("1 == 1", () =>{
    a = 1
  }
  )
  expect(a).toBe(1)
})

// import express from 'express';
// import request from 'supertest'
// import { jest } from '@jest/globals'
// import user_routes from '../../../src/routes/user_routes';
// import * as userController from '../../../src/controllers/user_controller'; // Import the module

// // Mock the functions
// jest.spyOn(userController, 'createUser').mockImplementation(() => Promise.resolve());
// jest.spyOn(userController, 'loginUser').mockImplementation(() => Promise.resolve());

// const app = express();
// app.use(express.json());
// app.use('/user', user_routes);

// describe("POST /register", () => {

//   describe("given a username and password", () => {
//     // Should save to db
//     // Should respond with json object contianing user

//     test("Should respond with 200", async () => {
//       const response = await request(app).post("/user/register").send({
//         username: "pietertje",
//         email: "pieto@gmail.com",
//         password: "pass"
//       })
//       expect(response.statusCode).toBe(201)
//     })
//     // Should respond with 200
//     // Should specify json in the content type header
//   })

//   describe("when the username and password is missing", () => {

//   })

// })

// // Clear the mocks after each test
// afterEach(() => {
//   jest.clearAllMocks();
// });
