// Required node_modules
import hash from 'object-hash';
import NodeRSA from 'node-rsa';
import crypto from 'crypto'

/**
 * Creates digital signature with a hash and a UUID.
 * @param {object} object - The object or message that will be signed
 * @param {string} privateKeyString - The private key in string form
 * @returns {string} Returns the encrypted packet with hash and UUID
 */

export default function signObject(object, privateKeyString) {
    let privateKey = new NodeRSA
    privateKey = privateKey.importKey(privateKeyString);
    const unsigned = [hash(object), crypto.randomUUID()];
    console.log("signObject: object is signed");
    return privateKey.encryptPrivate(unsigned, 'base64');
}
