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

      const { id } = req.params
      const result = await columnService.update(id, req.body);
      res.status(httpStatusCode.OK).json({result});

   } catch (error) {
      res.status(httpStatusCode.INTERNAL_SERVER).json(error.messgae);
   }
};

export const columnController = { createNew, update };
