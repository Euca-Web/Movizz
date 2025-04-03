import request from "supertest";
import Server from "../src/core/server";
import { expect, it, describe, beforeAll } from "vitest";

describe("Middlewares", () => {
	let server: Server;

	beforeAll(() => {
		process.env.ASSETS_DIR = "public"; // Définir le dossier public
		server = new Server();
	});

	it("should validate request body", async () => {
		const response = await request(server.createServer())
			.post("/user")
			.send({}) // Envoi d'un corps vide
			.set("Content-Type", "application/json");
		expect(response.status).toBe(400); // Vérifie que le middleware de validation rejette la requête
	});

	it("should reject unauthorized requests", async () => {
		const response = await request(server.createServer()).get("/movie");
		expect(response.status).toBe(401); // Vérifie que le middleware d'authentification rejette la requête
	});

	it("should handle errors gracefully", async () => {
		const response = await request(server.createServer()).get("/unknown");
		expect(response.status).toBe(404); // Vérifie que le middleware de gestion des erreurs fonctionne
	});
});
