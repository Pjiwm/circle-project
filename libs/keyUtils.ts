import * as hash from "object-hash";
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
  encrypt(object: object, privateKey: string): string {
    let encrypt = new NodeRSA();
    encrypt = encrypt.importKey(privateKey, "private");
    const unsigned = [hash(JSON.stringify(object)), uuidv4()];
    return encrypt.encryptPrivate(unsigned, "base64");
  }

  /**
   * Decrypts cypher with publickey, returns uuid if publickey is valid.
   * @param {string} cypher, encrypted hash
   * @param {string} publicKey
   * @param {string} object for hash compare
   * @returns {string | boolean} returns UUID if decrypting with public key is valid, else return false
   */
  decrypt(cypher: string, publicKey: string, object: object): string | boolean {
    let decrypt = new NodeRSA();
    decrypt = decrypt.importKey(publicKey, "public");
    const objectHash = hash(JSON.stringify(object));

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
    const key = new NodeRSA({ b: 1024 });
    const publicKey = key.exportKey("public");
    const privateKey = key.exportKey("private");
    return [publicKey, privateKey];
  }

  isValidPrivateKey(privateKey: string) : boolean {
    let key = new NodeRSA();
    key = key.importKey(privateKey, "private");
    return key.isPrivate();
  }

  isValidPublicKey(publicKey: string) : boolean {
    let key = new NodeRSA();
    key = key.importKey(publicKey, "public");
    return key.isPublic();
  }
}
