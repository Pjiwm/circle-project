import hash from 'object-hash';
import NodeRSA from 'node-rsa';
/**
 * Verifies digital signature of an encrypted hashed object and retrieves the UUID
 * @param {object} packet - The encrypted packet which contains the hash and the UUID.
 * @param {object} object - The object or message to be verified
 * @param {string} pubKeyString - The public key in string form
 * @typedef {Object} returnItem 
 * @property {boolean} isValid - The object hash compared to the packet hash.
 * @property {string} UUID - The UUID that was sent in the packet
 * @returns {returnItem}
 */

 export default function verifyObject(packet, object, pubKeyString) {
    let pubKey = new NodeRSA;
    pubKey = pubKey.importKey(pubKeyString)
    const objectHash = hash(object);

    let [decryptedHash,UUID] = pubKey.decryptPublic(packet, 'json');
    const isValid = objectHash === decryptedHash;
    console.log("\n")
    console.log("verifyObject:")
    console.log("UUID =", UUID);

    console.log("object hash is valid: ",isValid);

    return {
        isValid: isValid,
        UUID: UUID
    }
}