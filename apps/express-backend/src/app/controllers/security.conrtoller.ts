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
    res.status(201).send({ PrivateKey: keys[1], PublicKey: keys[0] });
  };
  login = async function (req, res, next) {
    try {
      const person: Person = await PersonModel.findOne({
        name: req.body.name,
      }).exec();
      console.log(person);
      console.log(
        "signature: " + req.body.signature + "Publickey: " + person.publicKey+"Name: " + req.body.name);
      const decryptedMessage = rsaService.decrypt(req.body.signature,person.publicKey,{name: req.body.name});
      console.log(decryptedMessage);
      if (decryptedMessage) {
        console.log(process.env.PRIVATEKEY_SERVER);
        const signature = rsaService.encrypt({person: person},process.env.PRIVATEKEY_SERVER);
        console.log(signature);
        res.status(200).send({ signature: signature, person: person });
      }
    } catch (err) {
      next(err);
    }
  };
}
