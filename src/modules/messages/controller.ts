import { Router } from "express";
import * as messages from "./service";

const router = Router()

// Get all messages or filter by userId or sprintId 
router.get("/", async (req, res) => {
    try {
        const { userId, sprintId } = req.query;

        if (userId) {
            // Fetch messages for the specific user from the database
            console.log("Fetching messages for user:", userId);
            res.status(200).json({ message: `Fetched messages for user ${userId} successfully.` });
        } else if (sprintId) {
            // Fetch messages for the specific sprint from the database
            console.log("Fetching messages for sprint:", sprintId);
            res.status(200).json({ message: `Fetched messages for sprint ${sprintId} successfully.` });
        } else {
            // Fetch all messages from the database
            console.log("Fetching all messages");
            const messagesList = await messages.findAll()
            res.status(200).json(messagesList);
        }
    } catch (err) {
        res.status(500).json({ err: (err as Error).message });
    }
});

// Send sucess message to Discord
router.post("/", async (req, res) => {
    try{
        const { username, sprintCode } = req.body;
        console.log("Request body:", req.body);
        res.status(200).json({message: "Great success! You just send new message to Discrod"})
    } catch(err) {
        res.status(500).json({err: (err as Error).message})
    }
})

export default router