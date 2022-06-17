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

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public currentPerson$ = new BehaviorSubject<Person | undefined>(undefined);
  private readonly CURRENT_PERSON: string = "currentperson";
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
    const signature = keyutil.encrypt({ name: name }, privateKey);
    console.log(signature);

    const serverKey = "";

    return this.http
      .post<[string, Person]>(this.ApiUrl, { name: name, signature: signature })
      .pipe(
        map(([signature, person]) => {
          if (signature && person) {
            const decrypt = keyutil.decrypt(signature, serverKey, person);
            if (decrypt) {
              this.currentPerson$.next(person);
              const user: User = {
                id: person._id,
                name: person.name,
                PrivateKey: privateKey,
                PublicKey: person.publicKey,
              };
              this.saveUserToLocalStorage(user);
              return person;
            }
          }
          return person;
        }),
        catchError((error: any) => {
          console.log("error:", error);
          return of();
        })
      );
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
}
