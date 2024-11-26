import express from 'express'
import init from '../controllers/demoRedis.js'

const redisRouter = express.Router()

redisRouter.route('/redis').get(init)

export default redisRouter