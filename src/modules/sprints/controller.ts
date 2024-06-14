import { Router } from "express";

const router = Router()

router.get("/", async (req, res) => {
    try {
        res.status(200).json({message: "Fetched all sprint information"})
    } catch (err) {
        res.status(500).json({ err: (err as Error).message });
    }
})

router.get("/:sprintId", async (req, res) => {
    try {
        const { sprintId } = req.params; 
        res.status(200).json({message: `Fetched a sprint content for sprint id-${sprintId}`});
    } catch (err) {
        res.status(500).json({ err: (err as Error).message });
    }
});

router.post("/", async (req, res) => {
    try {
        const {code, title} = req.body
        res.status(200).json({message: `These are details for new sprint: sprint code - ${code} and sprint title - ${title}`})
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