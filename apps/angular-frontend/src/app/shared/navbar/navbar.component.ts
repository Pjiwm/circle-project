import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Person } from '../../../../../../libs/models'
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "the-circle-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  loggInUser$!: Observable<Person | undefined>;
  
  constructor(private authservice: AuthService) {}

  ngOnInit(): void {
    this.loggInUser$ = this.authservice.currentPerson$
  }

  logout(): void {
    this.authservice.logout();
  }
}
