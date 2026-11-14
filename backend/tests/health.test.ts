import { describe, it, expect } from "@jest/globals";
import app from "../src/app.js";
import request from "supertest";

describe("Health Check", () => {
    it("should return 200 OK", async () => {
        const response = await request(app).get("/api/health");

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            status: "OK",
            application: "EasyLearning API"
        });
    });
});