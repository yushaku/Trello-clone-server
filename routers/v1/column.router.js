import express from 'express'
import {columnController} from '../../controllers/column.controller.js'
import {columnValidation} from '../../validations/column.validation.js'


const router = express.Router()
router.route('/')
   .get((req, res)=>{ res.json('test') })
   .post(columnValidation.createNew, columnController.createNew)

router.route('/:id')
   .put(columnValidation.update, columnController.update)


export const columnRouter = router