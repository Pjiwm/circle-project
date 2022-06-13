import { Component, OnInit } from "@angular/core";
//import { StreamService } from "../../services/StreamService";

@Component({
  selector: "the-circle-stream",
  templateUrl: "./stream.component.html",
  styleUrls: ["./stream.component.scss"],
})
export class StreamComponent implements OnInit {
  value = "";
  //constructor() {}

  ngOnInit() {
    this.value = "";
  }
}
