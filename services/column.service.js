import {columnModel} from '../models/column.model.js'

const createNew = async(data)=>{
   try {
      const result = await columnModel.createNew(data)
      return result

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
      console.log(result)
      return result

   } catch (error) {
      throw new Error(error)      
   }
}

export const columnService = {createNew, update}