import * as hash from "sha1";
import * as NodeRSA from "node-rsa";
import { v4 as uuidv4 } from "uuid";

export class RsaService {
  private enabled: boolean;

  constructor() {
    this.enabled = true;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * encrypts cypher with privatekey, returns digital signature
   * @param {string} privateKey
   * @param {string} object for hash compare
   * @returns {string} returns digital signature
   */
  encrypt(object: object | string, privateKey: string): string {
    let encrypt = new NodeRSA();
    encrypt = encrypt.importKey(this.sanatiseKey(privateKey), "pkcs8-private-pem");
    console.log('hash: ' + hash(object))
    let hashString = typeof object === "string" ? hash(object) : hash(JSON.stringify(object))
    const unsigned = JSON.stringify([hashString, uuidv4()]);
    return encrypt.encryptPrivate(Buffer.from(unsigned,"utf-8"), "base64","utf8");
  }

  /**
   * Decrypts cypher with publickey, returns uuid if publickey is valid.
   * @param {object} cypher, encrypted hash
   * @param {string} publicKey
   * @param {string} object for hash compare
   * @returns {string | boolean} returns UUID if decrypting with public key is valid, else return false
   */
  decrypt(cypher: string | Buffer, publicKey: string, object: object | string): string | boolean {
    let decrypt = new NodeRSA();
    decrypt = decrypt.importKey(this.sanatiseKey(publicKey), "pkcs8-public-pem");
    let objectHash = typeof object === "string" ? hash(object) : hash(JSON.stringify(object))
    let [decryptedHash, UUID] = decrypt.decryptPublic(cypher, "json");
    const isValid = objectHash === decryptedHash;
    if (isValid) {
      console.log("UUID =", UUID);
      console.log("object hash is valid: ", isValid);
      return UUID;
    }
    return false;
  }

  /**
   * Creates a public-private key pair
   * @returns {Array} contains public key on 0 and private key on 1
   */
  keyGen(): [string, string] {
    const key = new NodeRSA({b: 1024});
    const publicKey = key.exportKey("pkcs8-public-pem");
    const privateKey = key.exportKey("pkcs8-private-pem");
    return [this.sanatiseKey(publicKey), this.sanatiseKey(privateKey)];
  }

  isValidPrivateKey(privateKey: string) : boolean {
    let key = new NodeRSA();
    key = key.importKey(this.sanatiseKey(privateKey), "pkcs8-private-pem");
    return key.isPrivate();
  }

  isValidPublicKey(publicKey: string) : boolean {
    let key = new NodeRSA();
    key = key.importKey(this.sanatiseKey(publicKey), "pkcs8-public-pem");
    return key.isPublic();
  }
  sanatiseKey(key: String){
    return key.replace(/\n/g, "");
  }
}