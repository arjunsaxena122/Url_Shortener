import express from 'express'
import {generateNewShortUrl,getShortUrlId,getAnalytics} from '../controllers/url.controllers.js'

const urlRouter = express.Router()

urlRouter.route('/url').post(generateNewShortUrl)

urlRouter.route('/:shortId').get(getShortUrlId)

urlRouter.route('/analytics/:shortId').get(getAnalytics)


export default urlRouter