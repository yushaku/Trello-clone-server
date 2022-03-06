import Joi from "joi";
import { getDb } from "../configs/mongodb";

const cardCollectionName = "cards";

const cardCollectionSchema = Joi.object({
   boardId: Joi.string().required(),
   columnId: Joi.string().required(),
   title: Joi.string().required(),
   cover:Joi.string().default(null),
   
   createdAt: Joi.date().timestamp().default(Date.now()),
   updatedAt: Joi.date().timestamp.default(null),
   _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
   return await cardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
   try {
      const value = await validateSchema(data);
      const result = await getDb().collection(cardCollectionName).insertOne(value);
      return result.ops

   } catch (error) {
      console.log(error);
   }
};

export const boardModel = { createNew };