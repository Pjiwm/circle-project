export class User {
  id: number;
  name: string;
  publicKey: string;

  constructor(id: number, name: string, publicKey: string) {
    this.id = id;
    this.name = name;
    this.publicKey = publicKey;
  }
}
