import express from 'express'
import { boardRouter } from './board.router.js'

const router = express.Router()

// router.get('/status', (req, res)=>{
//    res.status(httpStatusCode.OK).json({
//       status: 'ok'
//    })
// })

router.use('/boards', boardRouter);

export const apiV1 = router