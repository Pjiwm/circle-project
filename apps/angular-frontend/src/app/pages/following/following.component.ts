import { Component, OnInit } from "@angular/core";
import { faEye } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: "the-circle-following",
  templateUrl: "./following.component.html",
  styleUrls: ["./following.component.scss"],
})
export class FollowingComponent implements OnInit {
  FaEye = faEye;
  constructor() {}

  ngOnInit(): void {}
}
