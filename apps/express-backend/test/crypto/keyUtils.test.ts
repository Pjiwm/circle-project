import {RsaService} from "../../../../libs/keyUtils";

describe("Test all methods of the RsaService", () => {
    // let keys: string[];
    // const secretValue = {"message":"Extremely secret part of a message"};
    // const messedWithValue = {"message":"This is a tampered message"};
    // let encryptedValue;
    describe("KeyGen",() => {
        test("keyGen should return keys", async () => {
            const testRsaService = new RsaService;
            const keys: string[] = testRsaService.keyGen();
            expect(keys[0]).not.toBeNull();
            expect(keys[1]).not.toBeNull();
        });
    
        test("Keygen should return valid private key", () => {
            const testRsaService = new RsaService;
            const keys: string[] = testRsaService.keyGen();
            expect(testRsaService.isValidPublicKey(keys[0])).toBe(true);
        });
        
        test("Keygen should return valid public key", () => {
            const testRsaService = new RsaService;
            const keys: string[] = testRsaService.keyGen();
            expect(testRsaService.isValidPrivateKey(keys[1])).toBe(true);
        });
    });
    describe("Encrypt/decrypt",() => {
        test("Encrypted message should not equal unencrypted message", () => {
            const testRsaService = new RsaService;
            const bobsMessage = {"message": "Hello Bob"};
            const alicesMessage = {"message": "Hello Alice"};
            const keys: string[] = testRsaService.keyGen();
            const encryptedValueBob = testRsaService.encrypt(bobsMessage, keys[1]);
            const encryptedValueAlice = testRsaService.encrypt(alicesMessage, keys[1]);
            expect(encryptedValueBob).not.toEqual(bobsMessage);
            expect(encryptedValueAlice).not.toEqual(alicesMessage);
        });
        test("Encrypted message should not equal different encrypted message", () => {
            const testRsaService = new RsaService;
            const bobsMessage = {"message": "Hello Bob"};
            const alicesMessage = {"message": "Hello Alice"};
            const keys: string[] = testRsaService.keyGen();
            const encryptedValueBob = testRsaService.encrypt(bobsMessage, keys[1]);
            const encryptedValueAlice = testRsaService.encrypt(alicesMessage, keys[1]);
            expect(encryptedValueAlice).not.toEqual(encryptedValueBob);
        });
    
        test("Decrypted message should not equal different message", () => {
            const testRsaService = new RsaService;
            const bobsMessage = {"message": "Hello Bob"};
            const tamperedValueBob = {"message": "Hello Bobb"};
            const keys: string[] = testRsaService.keyGen();
            const encryptedValueBob = testRsaService.encrypt(bobsMessage, keys[1]);
            expect(testRsaService.decrypt(encryptedValueBob,keys[0],tamperedValueBob)).toBeFalsy();
        });
    });


});