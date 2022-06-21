import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
} from "rxjs";

import { Room, Person } from "../../../../../libs/models";
import { RsaService } from "../../../../../libs/keyUtils";
import { User } from "../models/user";
import { PUBLIC_SERVER_KEY } from "../../../../../libs/key";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public currentPerson$ = new BehaviorSubject<Person | undefined>(undefined);
  private readonly CURRENT_PERSON: string = "currentperson";
  private readonly UUIDS: string = "UUIDS";
  private ApiUrl = environment.APIURL + "auth/login";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    }),
  };

  constructor(private http: HttpClient, private router: Router) {
    this.getPersonFromLocalStorage()
      .pipe(
        switchMap((person: Person) => {
          if (person) {
            console.log("Person found in local storage");
            this.currentPerson$.next(person);
            return of(person);
          } else {
            console.log(`No current person found`);
            return of(undefined);
          }
        })
      )
      .subscribe(() => console.log("Startup authentication succesful"));
  }

  login(name: string, privateKey: string): Observable<Person> {
    const keyutil = new RsaService();
    if (keyutil.isValidPrivateKey(privateKey)) {
      const signature = keyutil.encrypt({ name: name }, privateKey);

      return this.http
        .post<any>(this.ApiUrl, { name: name, signature: signature })
        .pipe(
          map((pakage) => {
            const signatureP = pakage.signature;
            console.log(signatureP)
            const person = pakage.person;
            if (signatureP && person) {
              const decrypt = keyutil.decrypt(
                signatureP.toString(),
                PUBLIC_SERVER_KEY,
                { person: person }
              );
              if (decrypt) {
                let UUID: string = decrypt as string;
                if (this.isReplayAttack(UUID)) {
                  console.log("this is a replay attack");
                  return null;
                }
                const user: User = {
                  _id: person._id,
                  name: person.name,
                  privateKey: privateKey,
                  publicKey: person.publicKey,
                };
                this.saveUUIDToLocalStorage(UUID);
                this.saveUserToLocalStorage(user);
                this.currentPerson$.next(person);
                return person;
              }
            }
            return null;
          }),
          catchError((error: any) => {
            console.log("error:", error);
            return of();
          })
        );
    }
    return of();
  }

  logout(): void {
    this.router
      .navigate(["/login"])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log("logout - removing local person info");
          localStorage.removeItem(this.CURRENT_PERSON);
          this.currentPerson$.next(undefined);
        } else {
          console.log("navigate result:", success);
        }
      })
      .catch((error) => console.log("not logged out!"));
  }

  public getPersonFromLocalStorage(): Observable<Person> {
    const localPersonJson = localStorage.getItem(this.CURRENT_PERSON);
    const localPerson =
      localPersonJson !== null ? JSON.parse(localPersonJson) : null;
    return of(localPerson);
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem(this.CURRENT_PERSON, JSON.stringify(user));
  }

  public saveUUIDToLocalStorage(UUID: string): void {
    let existingUUIDS = this.getUUIDSFromLocalStorage();
    existingUUIDS.push(UUID);
    localStorage.setItem(this.UUIDS, JSON.stringify(existingUUIDS));
  }

  public getUUIDSFromLocalStorage(): [string] {
    let existingUUIDS = JSON.parse(localStorage.getItem(this.UUIDS));
    if (existingUUIDS == null) existingUUIDS = [];
    return existingUUIDS;
  }

  public isReplayAttack(UUID: string): boolean {
    let existingUUIDS = this.getUUIDSFromLocalStorage();
    return existingUUIDS.includes(UUID);
  }
}
