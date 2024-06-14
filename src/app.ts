import express from 'express'
import messages from "./modules/messages/controller"
import messageTemplates from "./modules/message-templates/controller"

const app = express()
app.use(express.json())

app.use("/messages", messages)
app.use("/templates", messageTemplates)

export default app
