import express from "express"
import redis, { Redis } from 'ioredis'


const client = new Redis()
const app = express()

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))


// Routers

import urlRouter from "./routes/url.routes.js"
import routerRedis from './routes/redis.js'

app.use('/',urlRouter)
app.use('/',routerRedis)


// Error URl

app.use((req,res)=>{
    res.status(404).json({error:' This page is not valid'})
})

export  {app, client}