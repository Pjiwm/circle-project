import { Component, OnInit, ViewChild } from "@angular/core";
//import { StreamService } from "../../services/StreamService";
import {WebcamImage} from 'ngx-webcam';
import { Observable, Subject } from "rxjs";
import { StreamService } from "../../services/StreamService";

@Component({
  selector: "the-circle-stream",
  templateUrl: "./stream.component.html",
  styleUrls: ["./stream.component.scss"],
})
export class StreamComponent implements OnInit {
  public webcamImage: WebcamImage | null = null;
  private trigger: Subject<void> = new Subject<void>();

  constructor(private streamService: StreamService){

  }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  Start(): void {
    this.trigger.next();
  }

  Stop(): void {
   }

  Pause(): void {

  }

  ViewerCount(): number {
    return 0;
  }
}
