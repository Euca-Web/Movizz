import request from "supertest";
import Server from "../src/core/server";
import { expect, it, describe, beforeAll } from "vitest";

describe("Server Routes", () => {
	let server: Server;

	beforeAll(() => {
		// Définir la variable d'environnement pour le dossier public
		process.env.ASSETS_DIR = "public";
		server = new Server();
	});

	it("should respond to the home route", async () => {
		const response = await request(server.createServer()).get("/");
		expect(response.status).toBe(200);
	});

	it("should respond to the /gender route", async () => {
		const response = await request(server.createServer()).get("/gender");
		expect(response.status).toBe(200);
	});

	it("should respond to the /movie route", async () => {
		const response = await request(server.createServer()).get("/movie");
		expect(response.status).toBe(200);
	});

	it("should respond to the /user route", async () => {
		const response = await request(server.createServer()).get("/user");
		expect(response.status).toBe(200);
	});

	it("should respond to the /comments route", async () => {
		const response = await request(server.createServer()).get("/comments");
		expect(response.status).toBe(200);
	});

	it("should respond to the /role route", async () => {
		const response = await request(server.createServer()).get("/role");
		expect(response.status).toBe(200);
	});

	// it("should respond to the /contact route", async () => {
	// 	const response = await request(server.createServer()).get("/contact");
	// 	expect(response.status).toBe(200);
	// });

	it("should respond with 404 for unknown routes", async () => {
		const response = await request(server.createServer()).get("/unknown");
		expect(response.status).toBe(404);
	});
});
