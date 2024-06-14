import { Router } from "express";
import { z } from "zod";
import * as sprints from "./services"
import * as schema from "./schema"


const router = Router()

router.get("/", async (req, res) => {
    const parsedInput = schema.parseInput(req.query);
    const { code, title } = parsedInput;

    try {
        if (code) {
            // fetch sprint by sprint code
            const sprintInfo = await sprints.findSprintByCode(code as string)
            res.status(200).json(sprintInfo)
        } else if (title) {
            // fetch sprint by title
            const sprintInfo = await sprints.findSprintByTitle(title as string)
            res.status(200).json(sprintInfo) 
        } else {
            // get all sprints
            const sprintList = await sprints.findAllSprints()
            res.status(200).json(sprintList)
        }
    } catch (err) {
        if (err instanceof z.ZodError) {
            res.status(400).json({err: err.errors})
        } else {
            res.status(500).json({ err: (err as Error).message });
        }
    }
})

router.post("/", async (req, res) => {
    try {
        const body = schema.parseNewSprintInput(req.body)
        const newSprint = await sprints.createSprint(body)
        res.status(200).json(newSprint)
    } catch (err) {
        res.status(500).json({ err: (err as Error).message });
    }
})

router.patch("/:sprintId", async (req, res) => {
    try {
        const {sprintId} = req.params
        res.status(200).json({message: `Updated a sprint with sprintId-${sprintId}. This is what was updated ${req.body}`})
    } catch (err) {
        res.status(500).json({ err: (err as Error).message });
    }
})

router.delete("/:sprintId", async (req, res) => {
    try {
        const {sprintId} = req.params
        res.status(200).json({message: `SPrint-${sprintId} was deleted`})
    } catch (err) {
        res.status(500).json({ err: (err as Error).message });
    }
})

export default router