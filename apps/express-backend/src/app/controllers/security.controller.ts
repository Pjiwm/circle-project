import { RsaService } from "../../../../../libs/keyUtils";
import { UUIDHelper } from "../helpers/uuids";
const uuidHelper = new UUIDHelper();
const rsaService = new RsaService();
import { PersonModel } from "../../schemas/person.model";
import { Person } from "../../../../../libs/models";
import { PRIVATE_SERVER_KEY } from "../../../../../libs/key";

export class SecurityController {
  /**
   * @description Creates a keys.
   * @param {*} res - the response we give back a public and private key
   */
  createKeys = async function (req, res) {
    const keys = rsaService.keyGen();
    res.status(201).send({ privateKey: keys[1], publicKey: keys[0] });
  };

  
  login = async function (req, res, next) {
    try {
      const personPromise: Person = await PersonModel.findOne({
        name: req.body.name,
      }).exec();

      // Convert promise to object
      const person: Person = new Person(
        personPromise._id,
        personPromise.name,
        personPromise.publicKey,
        personPromise.satochi,
        personPromise.followed
      );

      const decryptedMessage = rsaService.decrypt(
        req.body.signature,
        person.publicKey,
        { name: req.body.name }
      );
      const uuidCheck = await uuidHelper.check(decryptedMessage);
      if (decryptedMessage && uuidCheck) {
          const signature = rsaService.encrypt({ person: person }, PRIVATE_SERVER_KEY);
          res.status(200).send({ signature: signature, person: person });
      } else {
        res.status(418).send({ Message: "Object not integer"});
      }
    } catch (err) {
      next(err);
    }
  };
}
