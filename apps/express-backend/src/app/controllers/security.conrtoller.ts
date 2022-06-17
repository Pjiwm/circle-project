import * as KeyGen from "../../../../../libs/key.utils/keyGen.js";
export class SecurityController {
  /**
   * @description Creates a keys.
   * @param {*} res - the response we give back a public and private key
   */
  createKeys = async function (req, res) {
    const keys = KeyGen();
    res.status(201).send({PrivateKey: keys[0], PublicKey: keys[0]});
  };
}