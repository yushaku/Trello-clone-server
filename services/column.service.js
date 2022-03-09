import {columnModel} from '../models/column.model.js'
import { boardModel } from '../models/board.model.js'
import { cardModel } from '../models/card.model.js'

const createNew = async(data)=>{
   try {
      const newColumn = await columnModel.createNew(data)

      //update columnOrder array => in board 
      const boardId = data.boardId.toString()
      const columnId = newColumn.insertedId.toString()

      await boardModel.pushColumnOrder(boardId, columnId)

      return newColumn

   } catch (error) {
      throw new Error(error)      
   }
}

const update = async (id, data)=>{
   try {
      console.log(data)
      const updateData = {
         ...data,
         updatedAt: Date.now()
      }

      if(updateData._id) delete updateData._id
      if(updateData.cards) delete updateData.cards

      const result = await columnModel.update(id, updateData)

      if(updateData._destroy){
         cardModel.softDeleteManyCards(updateData.cardOrder)
      }

      return result

   } catch (error) {
      throw new Error(error)      
   }
}

export const columnService = {createNew, update}