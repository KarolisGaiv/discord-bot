import { Router } from "express";

const router = Router()

router.get("/", async (req, res) => {
    try {
        res.status(200).json({message: "Fetched all templates"})
    } catch (err) {
        res.status(500).json({ err: (err as Error).message });
    }
})

router.get("/:templateId", async (req, res) => {
    try {
        const { templateId } = req.params; 
        res.status(200).json({message: `Fetched a template content for template id-${templateId}`});
    } catch (err) {
        res.status(500).json({ err: (err as Error).message });
    }
});

router.post("/", async (req, res) => {
    try {
        const {text} = req.body
        res.status(200).json({message: `This is a new msg template text ${text}`})
    } catch (err) {
        res.status(500).json({ err: (err as Error).message });
    }
})

router.patch("/:templateId", async (req, res) => {
    try {
        const {templateId} = req.params
        const updateInfo = req.body
        res.status(200).json({message: `Updated a template content for template id-${templateId}. This was that was updated: ${updateInfo.message}`})
    } catch (err) {
        res.status(500).json({ err: (err as Error).message });
    }
})

router.delete("/:templateId", async(req, res) => {
    try {
        const templateToDelete = req.params
        res.status(200).json({message: `Deleted a template id-${templateToDelete}`})
    } catch (err) {
        res.status(500).json({ err: (err as Error).message });
    }
})


export default router