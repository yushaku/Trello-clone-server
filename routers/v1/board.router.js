import express from 'express'
import {boardController} from '../../controllers/board.controller.js'
import {boardValidation} from '../../validations/board.validattion.js'


const router = express.Router()

router.route('/')
   .post(boardValidation.createNew, boardController.createNew)

router.route('/:id')
   .get(boardController.getFullBoard)
   .put( boardController.update)

export const boardRouter = router