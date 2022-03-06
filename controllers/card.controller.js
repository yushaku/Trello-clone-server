import {httpStatusCode} from '../untilities/constants.js'
import { cardService } from '../services/card.service.js'

const createNew = async(req, res)=> {
   try {
      const result = await cardService.createNew(req.body)
      res.status(httpStatusCode.OK).json(result)
   } catch (error) {
      res.status(httpStatusCode.INTERNAL_SERVER).json(error.messgae)
   }
}


export const cardController = { createNew }

