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
  private ApiUrl = environment.APIURL + "login";

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
    //// hardcoded Login
    // const person: Person = {
    //   _Id: "1",
    //   Name: "John Deere",
    //   PublicKey: "12345",
    //   Satochi: 1,
    //   Followed: undefined,
    // };
    // const user: User = {
    //   id: person._Id,
    //   name: person.Name,
    //   PrivateKey: privateKey,
    //   PublicKey: person.PublicKey,
    // };
    // this.currentPerson$.next(person);
    // this.saveUserToLocalStorage(user);
    // return of(person);

    ///////
    const publicKey =
      "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB";
    const testPrivateKey =
      "MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQABAoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fvxTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeHm7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAFz/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIMV7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATeaTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5AzilpsLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Ozuku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876";
    const keyutil = new RsaService();
    const signature = keyutil.encrypt(name, testPrivateKey);
    console.log(signature);
    const decrypted = keyutil.decrypt(signature, publicKey, name);
    console.log(decrypted);
    return this.http
      .post<Person>(this.ApiUrl, { name: name, signature: signature })
      .pipe(
        map((person) => {
          if (person) {
            this.currentPerson$.next(person);
            const user: User = {
              id: person._Id,
              name: person.Name,
              PrivateKey: privateKey,
              PublicKey: person.PublicKey,
            };

            this.saveUserToLocalStorage(user);
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
