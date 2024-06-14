import request from "supertest";
import express from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import messagesRouter from "../controller"

describe("messages controller", () => {
    let app: express.Application
    
    beforeEach(() => {
        app = express()
        app.use(express.json())

        const messagesService = {
            sendMessage: vi.fn(),
            getMessages: vi.fn(),
            getMessagesByUsername: vi.fn(),
            getMessagesBySprint: vi.fn(),
        }

        app.use("/messages", messagesRouter(messagesService))
    })

    it("should respond to GET/messages", async () => {
        (messagesService.getMessages as vi.Mock).mockResolvedValue([])

        const res = await request(app).get("/messages")
        expect(res.status).toBe(200)
    })
})