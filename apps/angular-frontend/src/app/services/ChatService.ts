import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Chat } from '../models/Chat';
import * as shajs from 'sha.js';

@Injectable({
    providedIn: 'root',
  })
export class ChatService {

    constructor(private http: HttpClient) {
    }

    // Methode getAllMessages from (id) Streamer Stream API
    getAllMessages(streamerId: string, username: string): any[] {
        return []; 
    }

    // Methode sendMessage to (id) streamer

    sendMessage(message: string): string {
        return "";
    }

    // Methode getAllFollowers in the stream
    getViewers(viewerCount: number): Number {
        return 10;
    } 

    getSignature(username: string, message: string, timestamp: Date, streamer: string, ls: string): string {
        const jsonObj = JSON.parse(localStorage.getItem('currentperson'))
        const obj = JSON.parse("{'username':'"+username+"','message':'"+message+"','timestamp':'"+timestamp+"','streamer':'"+streamer+"'}")
        const digest = shajs('sha256').update({obj}).digest('hex')

        return digest;

        
    }


}