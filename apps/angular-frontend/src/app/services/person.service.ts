import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Person, Room } from "../../../../../libs/models";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PersonService {
  baseUrl: string = "http://localhost:3000/api";
  headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://127.0.0.1",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  constructor(public http: HttpClient) {}

  getById(id:string): Observable<Person> {
    return this.http
      .get<Person>(`${this.baseUrl}/persons/${id}`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getFollowed(): Observable<Room[]> {
    return this.http
      .get<Person[]>(`${this.baseUrl}/persons/62ab2a281baa042d4359edb4`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response.followed
        })
      );
  }
}
