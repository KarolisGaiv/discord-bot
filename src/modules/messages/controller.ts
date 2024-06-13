import { Router } from "express";

const router = Router()

router.get("/", async (req, res) => {
    try{
        res.status(200).json({message: "Great success!"})
    } catch(err) {
        res.status(500).json({err: (err as Error).message})
    }
})





export default router