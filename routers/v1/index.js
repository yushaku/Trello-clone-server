import express from 'express'
import { boardRouter } from './board.router.js'
import {columnRouter} from './column.router.js'
import { cardRouter } from './card.router.js'

const router = express.Router()

router.use('/boards', boardRouter);
router.use('/columns', columnRouter);
router.use('/cards', cardRouter);

export const apiV1 = router