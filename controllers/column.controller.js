import { httpStatusCode } from "../untilities/constants.js";
import { columnService } from "../services/column.service.js";

const createNew = async (req, res) => {
   try {
      const result = await columnService.createNew(req.body);
      res.status(httpStatusCode.OK).json(result);
   } catch (error) {
      res.status(httpStatusCode.INTERNAL_SERVER).json(error.messgae);
   }
};

const update = async (req, res) => {
   try {

      const { _id } = req.params;
      const result = await columnService.update(_id, req.body);
      res.status(httpStatusCode.OK).json({result});

   } catch (error) {
      res.status(httpStatusCode.INTERNAL_SERVER).json(error.messgae);
   }
};

export const columnController = { createNew, update };
