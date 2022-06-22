import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Person, Room } from "../../../../../libs/models";
import { Observable, map } from "rxjs";
import { AuthService } from "./auth.service";
import { PUBLIC_SERVER_KEY } from "libs/key";
import { RsaService } from "../../../../../libs/keyUtils";
import { User } from "../models/user";

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

  constructor(public http: HttpClient, public authService:AuthService) {}

  getById(id:string): Observable<Person> {
    const keyutil = new RsaService();
    return this.http
      .get<any>(`${this.baseUrl}/persons/${id}`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          const signature = response.signature;
          const person = response.person;
          if(signature && person) {
            const decrypt = keyutil.decrypt(
              signature.toString(),
              PUBLIC_SERVER_KEY,
              { person: person }
            );
            if (decrypt) {
              let UUID: string = decrypt as string;
              if (this.authService.isReplayAttack(UUID)) {
                console.log("this is a replay attack");
                return null;
              }
              this.authService.saveUUIDToLocalStorage(UUID);
              return person;
            }
          }
          return null;
        })
      );
  }

  getFollowed(): Observable<Room[]> {
    const keyutil = new RsaService();
     return this.http
     .get<Person[]>(`${this.baseUrl}/persons/${this.authService.currentPerson$.value._id}`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          console.log(response);
          const signature = response.signature;
          const followed = response.person.followed;
          if(signature && followed) {
            const decrypt = keyutil.decrypt(
              signature.toString(),
              PUBLIC_SERVER_KEY,
              { person: response.person }
            );
            if (decrypt) {
              let UUID: string = decrypt as string;
              if (this.authService.isReplayAttack(UUID)) {
                console.log("this is a replay attack");
                return null;
              }
              this.authService.saveUUIDToLocalStorage(UUID);
              console.log("Followed: " + followed)
              return followed;
            }
          }
          return null
        })
      );

  }
}
