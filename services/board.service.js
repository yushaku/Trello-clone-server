import {boardModel} from '../models/board.model.js'
import cloneDeep from 'lodash'

const createNew = async(data)=>{
   try {
      const result = await boardModel.createNew(data)
      return result

   } catch (error) {
      throw new Error(error)      
   }
}

const getFullBoard = async(id)=>{
   try {
      const board = await boardModel.getFullBoard(id)

      if(!board || !board.columns) return

      const transformBoard = cloneDeep(board)
      //transformBoard.columns = transformBoard.columns.filter((column) => !column._destroy)

      //push cards to its column
      board.columns.forEach((column)=>{
         column.cards = board.cards.filter((card) => card.columnId.toString() === column._id.toString()
         )
      })
      

      //remove cards data from boards
      delete board.cards

      //sort column by column order, this step will pass to front end dev
      //console.log(board)

      return board

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
      if(updateData.columns) delete updateData.columns

      const updatedBoard = await boardModel.update(id, updateData)

      return updatedBoard

   } catch (error) {
      console.log("error at service")
      throw new Error(error)      
   }
}

export const boardService = {createNew, getFullBoard, update}