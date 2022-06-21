export class User {
  _id: String;
  name: String;
  privateKey: String;
  publicKey: String;

  constructor(id: String, name: String, publicKey: String, privateKey: String) {
    this._id = id;
    this.name = name;
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }
}
