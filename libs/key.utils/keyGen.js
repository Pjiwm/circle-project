import NodeRSA from "node-rsa";
/**
 * Creates a public-private key pair
 * @returns {Array} contains public key on 0 and private key on 1
 */
export default function () {
    const key = new NodeRSA({ b: 512 });

    const publicKey = key.exportKey('public');
    const privateKey = key.exportKey('private');

    return [publicKey, privateKey];
}
