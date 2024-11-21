import express from "express"

const app = express()

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))


// Routers

import urlRouter from "./routes/url.routes.js"

app.use('/',urlRouter)

export default app