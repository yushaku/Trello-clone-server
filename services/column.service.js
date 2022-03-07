import {columnModel} from '../models/column.model.js'
import { boardModel } from '../models/board.model.js'

const createNew = async(data)=>{
   try {
      const newColumn = await columnModel.createNew(data)

      //update columnOrder array => in board 
      const boardId = data.boardId.toString()
      const columnId = newColumn.insertedId.toString()

      const updatedBoard = await boardModel.pushColumnOrder(boardId, columnId)

      return newColumn

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
      const result = await columnModel.update(id, updateData)
      return result

   } catch (error) {
      throw new Error(error)      
   }
}

export const columnService = {createNew, update}