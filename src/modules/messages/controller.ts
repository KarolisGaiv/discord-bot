import { Router } from "express";
import * as messages from "./service";
import * as schema from "./schema"
import { getGIF } from "../gifService/gifService";
import { getRandomTemplate } from "../message-templates/services";

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

// Send success message to Discord
router.post("/", async (req, res) => {
    try{
        // const body = schema.parseInput(req.body)
        const gifUrl = await getGIF()
        console.log(gifUrl);

        const message = await getRandomTemplate()
        console.log(message);

         // Combine the message body with the fetched gifUrl
        //  const newMessageData = {
        //     ...req.body,
        //     gifUrl,
        // };


        const newMessage = messages.create(req.body)
        res.status(200).json(gifUrl)
    } catch(err) {
        res.status(500).json({err: (err as Error).message})
    }
})

export default router