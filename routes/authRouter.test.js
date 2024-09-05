import request from "supertest";

import { closeDBConnection, initDBConnection } from "../initDBConnection.js";
import startServer from "../server.js";
import { findUser } from "../services/authServices.js";

describe("test /api/auth//users/login", () => {
  let server = null;

  beforeAll(async () => {
    initDBConnection(process.env.DB_HOST_TEST);
    server = startServer();
  });

  afterAll(async () => {
    await closeDBConnection();
    server.close();
  });

  test("test signup with correct data", async () => {
    const loginData = {
      email: "vova@gmail.com",
      password: "123456",
    };
    const { statusCode, body } = await request(server)
      .post("/api/auth//users/login")
      .send(loginData);

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("token");
    expect(typeof body.token).toBe("string");

    expect(body).toHaveProperty("user");
    expect(body.user).toHaveProperty("email", loginData.email);
    expect(body.user).toHaveProperty("subscription");
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
    const validSubscriptions = ["starter", "pro", "business"];
    expect(validSubscriptions).toContain(body.user.subscription);

    const user = await findUser({ email: loginData.email });

    expect(user).toBeTruthy();
    if (user) {
      expect(user.email).toBe(loginData.email);
      expect(validSubscriptions).toContain(user.subscription);
    }
  });
  test("test login with incorrect password", async () => {
    const loginData = {
      email: "vova@gmail.com",
      password: "1234567",
    };
    const { statusCode, body } = await request(server)
      .post("/api/auth//users/login")
      .send(loginData);

    expect(statusCode).toBe(401);
    expect(body).toHaveProperty("message", "Email or password is wrong");
  });
});
