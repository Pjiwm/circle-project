import { Component, OnInit } from "@angular/core";
import { faEye, faPlay, faTrophy, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: "the-circle-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit {

  FaEye = faEye
	FaPlay = faPlay
	faTrophy = faTrophy
	faCalenderAlt = faCalendarAlt

  constructor() {}

  ngOnInit(): void {}
}
