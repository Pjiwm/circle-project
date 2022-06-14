export class User {
  id: String;
  name: String;
  PrivateKey: String;
  PublicKey: String;

  constructor(id: String, name: String, publicKey: String, privateKey: String) {
    this.id = id;
    this.name = name;
    this.PrivateKey = privateKey;
    this.PublicKey = publicKey;
  }
}
