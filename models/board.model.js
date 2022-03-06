import Joi from "joi";
import { getDb } from "../configs/mongodb";

const boardCollectionName = "boards";

const boardCollectionSchema = Joi.object({
   title: Joi.string().required().max(20),
   columnOrder: Joi.array().items(Joi.string()).default([]),
   createdAt: Joi.date().timestamp().default(Date.now()),
   updatedAt: Joi.date().timestamp.default(null),
   _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
   return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
   try {
      const value = await validateSchema(data);
      const result = await getDb().collection(boardCollectionName).insertOne(value);
      return result.ops
   } catch (error) {
      console.log(error);
   }
};

export const boardModel = { createNew };
