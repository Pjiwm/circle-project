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

  encrypt(object: string, privateKey: string): string {
    let encrypt = new NodeRSA();
    encrypt = encrypt.importKey(privateKey, "private");
    const unsigned = [hash(object), uuidv4()];
    return encrypt.encryptPrivate(unsigned, "base64");
  }

  decrypt(cypher: string, publicKey: string, object: string): string {
    let decrypt = new NodeRSA();
    decrypt = decrypt.importKey(publicKey, "public");
    const objectHash = hash(object);

    let [decryptedHash, UUID] = decrypt.decryptPublic(cypher, "json");
    const isValid = objectHash === decryptedHash;
    console.log("\n");
    console.log("verifyObject:");
    console.log("UUID =", UUID);

    console.log("object hash is valid: ", isValid);

    return UUID;
  }
}
