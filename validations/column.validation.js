import Joi from 'joi'
import {httpStatusCode} from '../untilities/constants.js'

const createNew = async(req, res, next)=>{

   const condition = Joi.object({
      title: Joi.string().required().max(500).trim(),
      boardId: Joi.string().required()
   })

   try {
      await condition.validateAsync(req.body, {abortEarly: false})
      next()
   } catch (error) {
      res.status(httpStatusCode.BAD_REQUEST).json({Error: new Error(error).message})
   }
}
const update = async(req, res, next)=>{

   const condition = Joi.object({
      title: Joi.string().max(500).trim(),
   })

   try {
      await condition.validateAsync(req.body, {
         abortEarly: false,
         allowUnknown:true
      })
      next()
   } catch (error) {
      res.status(httpStatusCode.BAD_REQUEST).json({Error: new Error(error).message})
   }
}

export const columnValidation = {createNew, update}