import { Router } from "express";
import * as messages from "./service";
import * as schema from "./schema"

const router = Router()

// Get all messages or filter by userId or sprintId 
router.get("/", async (req, res) => {
    try {
        const { userName, sprintCode } = req.query;

        if (userName) {
            // Fetch messages for the specific user from the database
            const messagesList = await messages.findMessagesByUserId(userName as string)
            res.status(200).json(messagesList);
        } else if (sprintCode) {
            // Fetch messages for the specific sprint from the database
            const messagesList = await messages.findMessagesBySprintCode(sprintCode as string)
            res.status(200).json(messagesList);
        } else {
            // Fetch all messages from the database
            const messagesList = await messages.findAllMessages()
            res.status(200).json(messagesList);
        }
    } catch (err) {
        res.status(500).json({ err: (err as Error).message });
    }
});

// Send sucess message to Discord
router.post("/", async (req, res) => {
    try{
        const body = schema.parseInput(req.body)
        const newMessage = messages.create(body)
        res.status(200).json(newMessage)
    } catch(err) {
        res.status(500).json({err: (err as Error).message})
    }
})

export default router