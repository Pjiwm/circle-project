/*********
 * Generic controller which can pass any mongoose model
 */
 import { Model } from "mongoose";
 // the schema is suplied by injection
 export class CrudController {
     model: Model<any>;
      /**
      * @description Constructor that defines model.
      * @param {*} Model - The model that is used for the request.
      */
     constructor(model: Model<any>) {
         this.model = model;
     }
 
     /**
      * @description Creates a new entity.
      * @param {*} body - the body of the request
      * @param {*} res - the response we give back after we tried to add the requested object
      */
     create = async ({ body }: any, res: any, next): Promise<void> => {
         const entity = new this.model(body);
         await entity.save().catch(next);
         res.status(201).json({ id: entity.id });
     };
 
     /**
      * @description Obtains all objects found for specified model.
      */
     getAll = async (req, res, next): Promise<void> => {
         const entities = await this.model.find().catch(next);
         res.status(200).send(entities);
     };
 
     /**
      * @description Obtains a single object with the corresponding ID.
      * @param {*} params - the parameters in the request url, 
      * in this case we want the ID, so we can find a specific single object.
      */
     getById = async ({ params }: any, res, next): Promise<void> => {
         const entities = await this.model.findById(params.id).catch(next);
         res.status(200).send(entities);
     };
 
     /**
      * @description Finds an object based on its ID and edits it.
      * @param {*} body - the new values of the selected object
      * @param {*} params - the parameters in the request url, 
      * in this case we want the ID, so we can find a specific single object to edit.
      */
     update = async ({ body, params }: any, res, next): Promise<void> => {
         await this.model.findByIdAndUpdate({ _id: params.id }, body).catch(next);
         res.send({ message: "updated", object: await this.model.findById(params.id) });
     };
 
     /**
      * @description Removed an object based on its ID.
      * @param {*} params - the parameters in the request url, 
      * in this case we want the ID, so we can find a specific single object that should be removed.
      */
     deleteById = async ({ params }: any, res, next): Promise<void> => {
         const removedItem = await this.model.findByIdAndDelete(params.id).catch(next);
         res.send({ message: "deleted", object: removedItem });
     };
 }