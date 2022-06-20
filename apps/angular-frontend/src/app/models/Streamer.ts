export class Streamer {
    private _id: string;
    private slogan: string;
    private username: string;
    private satoshi: number;
    private viewerCount: number
    private live: boolean; 
    private publicKey: string;
    private privateKey: string;

    constructor(_id: string, slogan: string, username: string, satoshi: string, viewerCount: number, live: boolean, publicKey: string, privateKey: string){
        _id = _id;
        slogan = slogan;
        username = username;
        satoshi = satoshi;
        viewerCount = 0;
        live = false; 
        publicKey = publicKey;
        privateKey = privateKey
    }

}