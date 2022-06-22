import {RsaService} from "../../../../libs/keyUtils";
const testRsaService = new RsaService;

describe("Test singing", () => {
    let keys: string[];
    const secretValue = {"message":"Extremely secret part of a message"};
    const messedWithValue = {"message":"This is a tampered message"};
    let encryptedValue;
    test("Test generating keys", async () => {
        keys = testRsaService.keyGen();
        expect(keys[0]).not.toBeNull();
        expect(keys[1]).not.toBeNull();
    });

    test("Valid Public Key", () => {
        expect(testRsaService.isValidPublicKey(keys[0])).toBe(true);
    });
    
    test("Valid Private Key", () => {
        expect(testRsaService.isValidPrivateKey(keys[1])).toBe(true);
    });

    test("Test Encryption so that the encrypted value doesn't equal the input", () => {
        encryptedValue = testRsaService.encrypt(secretValue, keys[1]);
        expect(encryptedValue).not.toEqual(secretValue);
    });

    test("Test Decryption to see if the original message hasn't been tampered with", () => {
        const signCheck = testRsaService.decrypt(encryptedValue, keys[0], secretValue);
        expect(signCheck).not.toBeNull();
    });
});