import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDb } from "../configs/mongodb.js";
import {columnModel } from './column.model.js'
import {cardModel} from './card.model.js'

const boardCollectionName = "boards";

const boardCollectionSchema = Joi.object({
   title: Joi.string().required().max(20),
   columnOrder: Joi.array().items(Joi.string()).default([]),
   createdAt: Joi.date().timestamp().default(Date.now()),
   updatedAt: Joi.date().timestamp().default(null),
   _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
   return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
   try {
      const value = await validateSchema(data);
      const result = await getDb().collection(boardCollectionName).insertOne(value);
      return result.ops;
   } catch (error) {
      throw new Error(error);
   }
};

/**
 * @param {string} boardId
 * @param {string} columnId
 */
const pushColumnOrder = async (boardId, columnId) => {
   try {
      const result = await getDb()
         .collection(boardCollectionName)
         .findOneAndUpdate(
            { _id: ObjectId(boardId) },
            { $push: { columnOrder: columnId } },
            { returnNewDocument: true }
         );
      return result.value;
   } catch (error) {
      throw new Error(error);
   }
};

const getFullBoard = async (id) => {
   try {
      const result = await getDb()
         .collection(boardCollectionName)
         .aggregate([
            { $match: 
               { 
                  _id: ObjectId(id),
                  _destroy:false
               }
            },
            {
               $lookup: {
                  from: columnModel.columnCollectionName,
                  localField: "_id",
                  foreignField: "boardId",
                  as: "columns",
               },
            },
            {
               $lookup: {
                  from: cardModel.cardCollectionName,
                  localField: "_id",
                  foreignField: "boardId",
                  as: "cards",
               },
            },
         ])
         .toArray();

      return result[0] || {};
   } catch (error) {
      throw new Error(error);
   }
};

const update = async (id, data) => {

   try {
      const updateData = { ...data};
      const result = await getDb()
         .collection(boardCollectionName)
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

export const boardModel = { boardCollectionName, createNew, getFullBoard, pushColumnOrder, update };
