import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
  })
export class StreamService {

    constructor(private http: HttpClient) {
    }

    // Methode Start Stream API
    start(): void{

    }
    // Methode Stop Stream API

    stop(): void {

    }
    // Methode Pause Stream API

    pause(): void {
      
    }
}