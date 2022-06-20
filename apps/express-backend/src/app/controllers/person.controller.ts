import { RsaService } from "../../../../../libs/keyUtils";
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
          res.status(201).send({ signature: signature, person: person });
        } catch (err) {
          next(err);
        }
      };
    }