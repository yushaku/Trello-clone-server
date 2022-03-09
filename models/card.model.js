import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDb } from "../configs/mongodb.js";

const cardCollectionName = "cards";

const cardCollectionSchema = Joi.object({
   boardId: Joi.string().required(),
   columnId: Joi.string().required(),
   title: Joi.string().required(),
   cover: Joi.string().default(null),

   createdAt: Joi.date().timestamp().default(Date.now()),
   updatedAt: Joi.date().timestamp().default(null),
   _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
   return await cardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
   try {
      const validatedValue = await validateSchema(data);

      const insertValue = {
         ...validatedValue,
         boardId: ObjectId(validatedValue.boardId),
         columnId: ObjectId(validatedValue.columnId),
      };
      const result = await getDb().collection(cardCollectionName).insertOne(insertValue);
      return result;
   } catch (error) {
      throw new Error(error);
   }
};

const softDeleteManyCards = async (ids) => {
   try {
      // transform ids string => objectId on mongodb
      const transformIds = ids.map((id) => ObjectId(id));
      console.log(transformIds)
      const result = await getDb()
         .collection(cardCollectionName)
         .updateMany({ _id: { $in: transformIds } }, { $set: { _destroy: true } });

      return result;
   } catch (error) {
      console.log(error)
      throw new Error(error);
   }
};

const update = async (id, data) => {

   try {
      const updateData = { ...data};
      if(data.boardId) updateData.boardId = ObjectId(data.boardId)
      if(data.columnId) updateData.columnId = ObjectId(data.columnId)

      const result = await getDb()
         .collection(cardCollectionName)
         .findOneAndUpdate(
            { _id: ObjectId(id) }, 
            { $set: updateData } 
         );
      return result;
   } catch (error) {
      console.log("error at model")
      throw new Error(error);
   }
};
export const cardModel = { cardCollectionName, createNew, softDeleteManyCards, update };
