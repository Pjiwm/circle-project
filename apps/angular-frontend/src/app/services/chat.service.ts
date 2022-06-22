import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ChatMessage } from '../../../../../libs/models';
import { AuthService } from './auth.service';
import { PUBLIC_SERVER_KEY } from "libs/key";
import { RsaService } from "../../../../../libs/keyUtils";
import { Observable, map } from "rxjs";
import * as shajs from 'sha.js';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    baseUrl: string = "http://localhost:3000/api";
    headers = new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://127.0.0.1",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
    });

    constructor(private http: HttpClient, public authService: AuthService) {
    }

    // Methode getAllMessages from (id) Streamer Stream API
    getAllMessages(roomId: string): Observable<ChatMessage[]> {
        const keyutil = new RsaService();

        return this.http
            .get<ChatMessage[]>(`${this.baseUrl}/rooms/${roomId}/chats`, { headers: this.headers })
            .pipe(
                map((response: any) => {
                    const signature = response.signature;
                    const chats = response.chats;

                    if (signature && chats) {
                        const decrypt = keyutil.decrypt(
                            signature.toString(),
                            PUBLIC_SERVER_KEY,
                            { chats: response.chats }
                        );
                        if (decrypt) {
                            let UUID: string = decrypt as string;
                            if (this.authService.isReplayAttack(UUID)) {
                              console.log("this is a replay attack");
                              return null;
                            }
                            this.authService.saveUUIDToLocalStorage(UUID);
                            return chats;
                          }
                    }
                    return null;
                })
            );
    }

    // Methode sendMessage to (id) streamer

    sendMessage(chatMessage: ChatMessage): void {
        const keyutil = new RsaService();
        chatMessage.signature =  keyutil.encrypt(chatMessage, JSON.parse(localStorage.getItem('currentperson')).privateKey);
        console.log('aaaaaaaaaaaaaaaaaa', chatMessage);
        this.http
            .post<ChatMessage>(`${this.baseUrl}/chats`, chatMessage, { headers: this.headers }).subscribe();
    }

    // Methode getAllFollowers in the stream
    getViewers(viewerCount: number): Number {
        return 10;
    }

    // getSignature(username: string, message: string, timestamp: Date, streamer: string, ls: string): string {
    //     const jsonObj = JSON.parse(localStorage.getItem('currentperson'))
    //     const obj = JSON.parse("{'username':'" + username + "','message':'" + message + "','timestamp':'" + timestamp + "','streamer':'" + streamer + "'}")
    //     const digest = shajs('sha256').update({ obj }).digest('hex')

    //     return digest;
    // }
}