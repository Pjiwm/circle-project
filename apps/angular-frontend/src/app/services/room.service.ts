import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Person, Room } from "../../../../../libs/models";
import { Observable, map } from "rxjs";
import { AuthService } from "./auth.service";
import { RsaService } from "../../../../../libs/keyUtils";
import { PUBLIC_SERVER_KEY } from "libs/key";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  baseUrl: string = "http://localhost:3000/api";
  headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://127.0.0.1",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  constructor(public http: HttpClient, public authService:AuthService ) { }

  getById(id:string): Observable<Room> {
    return this.http
      .get<any>(`${this.baseUrl}/rooms/${id}`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          const signature = response.signature;
          const room = response.room;
          if(signature && room) {

          }
          return response;
        })
      );
  }

  getAll(): Observable<Room[]> {
    const keyutil = new RsaService();
    return this.http
      .get<any[]>(`${this.baseUrl}/rooms`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          const signature = response.signature;
          const rooms = response.rooms;
          if(signature && rooms) {
            const decrypt = keyutil.decrypt(
              signature.toString(),
              PUBLIC_SERVER_KEY,
              { rooms: rooms }
            );
            if (decrypt) {
                let UUID: string = decrypt as string;
                if (this.authService.isReplayAttack(UUID)) {
                  console.log("this is a replay attack");
                  return null;
                }
                this.authService.saveUUIDToLocalStorage(UUID);
                return rooms
              }
            } 
          }
        )
      );
  }
}
