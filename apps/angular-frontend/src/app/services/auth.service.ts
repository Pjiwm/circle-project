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

import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<User | undefined>(undefined);
  private readonly CURRENT_USER: string = "currentuser";

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
    this.getUserFromLocalStorage()
      .pipe(
        switchMap((user: User) => {
          if (user) {
            console.log("User found in local storage");
            this.currentUser$.next(user);
            return of(user);
          } else {
            console.log(`No current user found`);
            return of(undefined);
          }
        })
      )
      .subscribe(() => console.log("Startup authentication succesful"));
  }

  login(name: string): Observable<User> {
    const user: User = { id: 1, name: "John Deere", publicKey: "123" };
    this.currentUser$.next(user);
    this.saveUserToLocalStorage(user);
    return of(user);
  }

  logout(): void {
    this.router
      .navigate(["/login"])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log("logout - removing local user info");
          localStorage.removeItem(this.CURRENT_USER);
          this.currentUser$.next(undefined);
        } else {
          console.log("navigate result:", success);
        }
      })
      .catch((error) => console.log("not logged out!"));
  }

  public getUserFromLocalStorage(): Observable<User> {
    const localUserJson = localStorage.getItem(this.CURRENT_USER);
    const localUser = localUserJson !== null ? JSON.parse(localUserJson) : null;
    return of(localUser);
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }
}
