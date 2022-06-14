import { Component, OnInit } from "@angular/core";
import { faEye, faUsers, faTrophy, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: "the-circle-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit {

  FaEye = faEye
	faUsers = faUsers
	faTrophy = faTrophy
	faCalenderAlt = faCalendarAlt

  constructor() {}

  ngOnInit(): void {}
}
