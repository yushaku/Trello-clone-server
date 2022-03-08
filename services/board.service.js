import {boardModel} from '../models/board.model.js'

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
      //push cards to its column
      board.columns.forEach((column)=>{
         column.cards = board.cards.filter((card) =>
               card.columnId.toString() === column._id.toString()
         )
      })

      //remove cards data from boards
      delete board.cards

      //sort column by column order, this step will pass to front end dev


      return board

   } catch (error) {
      throw new Error(error)      
   }
}

export const boardService = {createNew, getFullBoard}