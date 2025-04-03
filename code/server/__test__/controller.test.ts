import request from "supertest";
import Server from "../src/core/server";
import { expect, it, describe, beforeAll } from "vitest";

describe("Controllers", () => {
	let server: Server;

	beforeAll(() => {
		process.env.ASSETS_DIR = "public";
		server = new Server();
	});

	it("should return a list of users from the UserController", async () => {
		const response = await request(server.createServer()).get("/user");
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("users"); // Vérifie que la réponse contient une clé "users"
	});

	it("should return a list of movies from the MovieController", async () => {
		const response = await request(server.createServer()).get("/movie");
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("movies"); // Vérifie que la réponse contient une clé "movies"
	});

	it("should handle invalid user ID in UserController", async () => {
		const response = await request(server.createServer()).get(
			"/user/invalid-id",
		);
		expect(response.status).toBe(400); // Vérifie que le statut est une erreur
		expect(response.body.message).toBe("Invalid user ID");
	});

	it("should handle missing movie ID in MovieController", async () => {
		const response = await request(server.createServer()).get("/movie/");
		expect(response.status).toBe(404); // Vérifie que le statut est une erreur
		expect(response.body.message).toBe("Movie not found");
	});
});
