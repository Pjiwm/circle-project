import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Person, Room } from "../../../../../libs/models";
import { Observable, map } from "rxjs";

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

  constructor(public http: HttpClient ) { }

  getById(id:string): Observable<Room> {
    return this.http
      .get<Room>(`${this.baseUrl}/rooms/${id}`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getAll(): Observable<Room[]> {
    return this.http
      .get<Room[]>(`${this.baseUrl}/rooms`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response
        })
      );
  }
}
