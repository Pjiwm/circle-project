import { RsaService } from "../../../../../libs/keyUtils";
const rsaService = new RsaService();
import { PersonModel } from "../../schemas/person.model";
import { Person } from "../../../../../libs/models";

export class SecurityController {
  /**
   * @description Creates a keys.
   * @param {*} res - the response we give back a public and private key
   */
  createKeys = async function (req, res) {
    const keys = rsaService.keyGen();
    const privatekey = JSON.stringify(keys[1]);
    const publickey = JSON.stringify(keys[0]);
    console.log(keys);
    res.status(201).send({ privateKey: privatekey, publicKey: publickey });
  };

  
  login = async function (req, res, next) {
    try {
      const personPromise: Person = await PersonModel.findOne({
        name: req.body.name,
      }).exec();

      // Convert promise to object
      const person: Person = new Person(personPromise._id, personPromise.name, personPromise.publicKey, personPromise.satochi, personPromise.followed);

      const decryptedMessage = rsaService.decrypt(req.body.signature,person.publicKey,{name: req.body.name});;
      if (decryptedMessage) {
        const signature = rsaService.encrypt({person: person},process.env.PRIVATEKEY_SERVER);
        res.status(200).send({ signature: signature, person: person });
      } else {
        res.status(418).send({ Message: "Object not integer"});
      }
    } catch (err) {
      next(err);
    }
  };
}
