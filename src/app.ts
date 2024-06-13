import express from 'express'
import messages from "./modules/messages/controller"

const app = express()
app.use(express.json())

app.use("/messages", messages)

export default app
