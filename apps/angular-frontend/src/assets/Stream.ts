export class Stream {
    private _id: string;
    private Slogan: string;
    private Username: string;
    private key: string;
    private viewerCount: number
    private live: boolean; 

    constructor(
        values: Object = {}
    ) {
        Object.assign(this, values);
    }er;
}