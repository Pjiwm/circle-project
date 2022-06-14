// Required node_modules
import hash from 'object-hash';
import NodeRSA from 'node-rsa';
import crypto from 'crypto'

/**
 * Creates digital signature with a hash and a UUID.
 * @param {object} object - The object or message that will be signed
 * @param {string} privKeyString - The private key in string form
 * @returns {string} Returns the encrypted packet with hash and UUID
 */

export default function signObject(object, privKeyString) {
    let privKey = new NodeRSA
    privKey = privKey.importKey(privKeyString);
    const unsigned = [hash(object), crypto.randomUUID()];
    console.log("signObject: object is signed");
    return privKey.encryptPrivate(unsigned, 'base64');
}
