import express from 'express'
import {boardController} from '../../controllers/board.controller.js'
import {boardValidation} from '../../validations/board.validattion.js'


const router = express.Router()
router.route('/')
   .get((req, res)=>{
      res.json('test')
   })
   .post(boardValidation.createNew, boardController.createNew)

export const boardRouter = router