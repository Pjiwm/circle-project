import { Component, OnInit } from "@angular/core";
import { faEye } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: "the-circle-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit {

  FaEye = faEye

  constructor() {}

  ngOnInit(): void {}
}
