import { RsaService } from "../../../../../libs/keyUtils";
import { UUIDHelper } from "../helpers/uuids";
const uuidHelper = new UUIDHelper();
const rsaService = new RsaService();
import { PRIVATE_SERVER_KEY } from "./../../../../../libs/key"; 
import { PersonModel } from "../../schemas/person.model";
import { Person } from "../../../../../libs/models";
export class PersonController {

    getById = async ({ params }: any, res, next): Promise<void> => {
        try {
            const personPromise = await PersonModel.findById(params.id);
            const person: Person = new Person(personPromise._id, personPromise.name, personPromise.publicKey, personPromise.satochi, personPromise.followed);
          const signature = rsaService.encrypt({ person: person },PRIVATE_SERVER_KEY);
          res.status(200).send({ signature: signature, person: person });
        } catch (err) {
          next(err);
        }
      };

      update = async ({ body, params }: any, res, next): Promise<void> => {
        try {
          const personPromise = await PersonModel.findById(params.id);
          const person: Person = new Person(personPromise._id, personPromise.name, personPromise.publicKey, personPromise.satochi, personPromise.followed);
  
          const decryptedMessage = rsaService.decrypt(body.signature,person.publicKey,{person : body.person});;
          const uuidCheck = await uuidHelper.check(decryptedMessage);
          if (decryptedMessage && uuidCheck) {
            await PersonModel.findByIdAndUpdate({ _id: params.id }, body.room);
            const signature = rsaService.encrypt({ person : body.person },PRIVATE_SERVER_KEY);
            res.status(200).send({ signature: signature, person : body.person });
          } else {
            res.status(418).send({ Message: "Object not integer"});
          }
        } catch (err) {
          next(err);
        }
      };
    }