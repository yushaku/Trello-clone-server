import {cardModel} from '../models/card.model.js'
import { columnModel } from '../models/column.model.js'
const createNew = async(data)=>{
   try {

      const newCard = await cardModel.createNew(data)

      const cardId = newCard.insertedId.toString()
      const columnId = data.columnId.toString()

      columnModel.pushCardOrder(columnId, cardId)

      return newCard

   } catch (error) {
      throw new Error(error)      
   }
}

const update = async (id, data)=>{
   try {
      const updateData = {
         ...data,
         updatedAt: Date.now()
      }
      
      if(updateData._id) delete updateData._id

      const updatedCard = await cardModel.update(id, updateData)

      return updatedCard

   } catch (error) {
      console.log("error at service")
      throw new Error(error)      
   }
}
export const cardService = {createNew, update}