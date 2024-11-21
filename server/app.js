import express from "express"

const app = express()

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))


// Routers

import urlRouter from "./routes/url.routes.js"

app.use('/',urlRouter)


// Error URl

app.use((req,res)=>{
    res.status(404).json({error:' This page is not valid'})
})

export default app