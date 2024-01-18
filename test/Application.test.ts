import { Request, Response, NextFunction } from "express";
import { app } from "../src";
import request from "supertest";
import { errorHandler } from "../src/middleware/errorHandler";
import { swaggerDocs } from "../src/v1/swagger";

describe("GET /api/users/:id", () => {
  it("should return a user", async () => {
    const response = await request(app).get(
      "/api/users/65a6dd119cc45b7df92664b1"
    );
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.user).toBeDefined();
    expect(response.body.code).toBe(200);
  });

  it("should return 404 if user not found", async () => {
    const response = await request(app).get(
      "/api/users/65a6dd119cc45b7df92664b2"
    );
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(404);
  });
});

describe("POST /api/users", () => {
  it("should create a user", async () => {
    const response = await request(app).post("/api/users").send({
      name: "Test",
      email: "test@gmail.com",
      password: "12345678",
      confirmPassword: "12345678",
      birth_year: 2000,
    });
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
  });

  // error de validación de datos
  it("should return 400 if data is invalid", async () => {
    const response = await request(app).post("/api/users").send({
      name: "TestDatos",
      email: "error@gmail.com",
      password: "123456",
      confirmPassword: "123456",
      birth_year: 200,
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});

describe("Error handler middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  test("handle error when error is a generic Error object", async () => {
    const error = new Error("Test error");

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith("Something broke!");
    expect(nextFunction).not.toHaveBeenCalled();
  });
});

describe("GET /docs", () => {
  it("retoena Swagger UI", async () => {
    swaggerDocs({ app, port: 3000 });
    const response = await request(app).get("/docs/");

    expect(response.status).toBe(200);
    expect(response.text).toContain("<title>Swagger UI</title>");
  });
});

describe("GET /docs.json", () => {
  it("debería devolver la especificación Swagger JSON", async () => {
    swaggerDocs({ app, port: 3000 });

    const response = await request(app).get("/docs.json");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toMatchObject({
      openapi: "3.0.0",
      info: {
        title: "API",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    });
  });
});
