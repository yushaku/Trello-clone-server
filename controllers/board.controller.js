import {httpStatusCode} from '../untilities/constants.js'
import { boardService } from '../services/board.service.js'

const createNew = async(req, res)=> {
   try {
      const result = await boardService.createNew(req.body)
      console.log(result)
      res.status(httpStatusCode.OK).json(result)
   } catch (error) {
      res.status(httpStatusCode.INTERNAL_SERVER).json(error.messgae)
   }
}


export const boardController = { createNew }

