import { RsaService } from "./keyUtils";

export function demo() {
    let rsaService : RsaService = new RsaService();
    // let [publicKey,privateKey] = rsaService.keyGen();
    // console.log(privateKey);
    // console.log(publicKey)
    let privateKey = "-----BEGIN PRIVATE KEY-----MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAKsdL88D0AYecNAjQUhVN4U5tEydER/ZccRrwEqK8BxrEomKtz5hRGtCVrNCw4e9kKoHTTJk03wVSawJ43R/fs1zYygdNM0vAD0BUWilqGwtMTtHteAXAe1vHCSBUUfJIAhWuFhlvM0hooZ2jc3YSwR1XMgdMnHKTtZ1+6Sivqr/AgMBAAECgYB1g4Xh1ex3R1CSoKOk2WFXzVlVhEjOZrcK/jUA/IoJ+j6w1uMhpAso3lZMpf1Cq50+J+WMRlI3VSdTTzc2OpkJvzi/wngJCxAk+Lut3R3nX0LrunVYxeRFaQhDfPV4cEEVTQXBhN8qKK0ENAhaDOLgXDhVuhOes4AV9yqSd4/mAQJBAOQnfsFscGIZBuQTnIdGFA6bn/KczAdzVgjF1SUxe78V08BiJM0Mk18Um53Wi1JFB7oWJmhjZiVxJfcNHcG1n48CQQC//4Mpxqiui8AHZXA+WfI1dZnkJ0HF2+HbqDw4COx+7bBdwlM0woX6e3X9I0uA2oCDcJMKZG1vXH9+SqlEZoWRAkBgj5qlEFkMG52AABDaa71nZVQvoU70xEqgUeJg6G2ANSO2o5MBuZXRwu4NwlSa0B5yEpfUzGTZ6eZwhfuXFWBfAkBXcu+w5XULG0f5lnBLVfiF9OyFCIRitEXpIHVdKGNfZK+B5PK1Ayy26+jPxXWsWNlUBMBUaW2W3VCMm0EBkJihAkBiEdZ3NRNQ4y/uZgw1nqMFewlxBFC5bhBqo8HxcGIJCGYhavYSXK23pXOtpCwfYE+0FKcUBcR6WvJ+qAqg4PlK-----END PRIVATE KEY-----"
    let publicKey = "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrHS/PA9AGHnDQI0FIVTeFObRMnREf2XHEa8BKivAcaxKJirc+YURrQlazQsOHvZCqB00yZNN8FUmsCeN0f37Nc2MoHTTNLwA9AVFopahsLTE7R7XgFwHtbxwkgVFHySAIVrhYZbzNIaKGdo3N2EsEdVzIHTJxyk7Wdfukor6q/wIDAQAB-----END PUBLIC KEY-----"
    let jsonObject = {"name": "Henk"};
    console.log("henk: ",Buffer.from("Henk","utf-8").toString('base64'));
    console.log("hello world in base64: ",Buffer.from("Hello World","utf-8").toString('base64'));
    let encrypted = "f4lD/f5Z9xiFObx2BfLC5LiY/t9ZGnKnATsE5tRghn3HUzGzww9x4WRU7yXpSH9ise47L+7GdnoWsWI8aoem9nTTz2LKCIdGeqCBShzW8FdBmgEnLu5UtYTeF9zlqGZ81f8GCJ2CV2hiQg1BegsfG4U+bl7i7o1gDDN4eWi2r2I="
    let encryptTest = rsaService.encrypt(jsonObject,privateKey);
    console.log(encryptTest);
    console.log("encrypted by nodersa: ", encrypted);
    console.log("encrypted: ", rsaService.decrypt(Buffer.from(encrypted,'base64'),publicKey,jsonObject));
}