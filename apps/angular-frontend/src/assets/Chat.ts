export class Chat{
    private username?: string;
    private message?: string;
    private timestamp?: Date;

    constructor(username: string, message: string, timestamp: Date){
        username = username;
        message = message;
        timestamp = timestamp;
    }
}