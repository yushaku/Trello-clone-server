import express from 'express'
import {cardController} from '../../controllers/card.controller.js'
import {cardValidation} from '../../validations/card.validation.js'


const router = express.Router()
router.route('/')
   .post(cardValidation.createNew, cardController.createNew)

router.route('/:id')
   .put(cardValidation.update, cardController.update)


export const cardRouter = router