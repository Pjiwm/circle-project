import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  HostListener
} from "@angular/core";
import { WebcamImage } from "ngx-webcam";
import { Subject } from "rxjs";
import { StreamService } from "../../../services/StreamService";
import { faPause, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "the-circle-stream",
  templateUrl: "./stream.component.html",
  styleUrls: ["./stream.component.scss"],
})
export class StreamComponent implements OnInit, AfterViewInit {
  @ViewChild("parentCam") parentCam: ElementRef;
  

  FaPlay = faPlay;
  FaPause = faPause;
  FaStop = faStop;
  WebcamOn = false;
  screenWidth: any;
  webcam_width = 200;
  measureCam = 100;
  initialized = false;

  @HostListener("window:resize", ["$event"])
  getScreenSize(event?) {
    if(this.initialized) {
      let measureCam = this.parentCam.nativeElement.offsetWidth;
      console.log("Div Width is: " + measureCam);
      this.webcam_width = measureCam;
    } else {
      this.screenWidth = window.innerWidth;
      this.webcam_width = this.screenWidth;
      console.log(this.screenWidth);
    }
  }

  public webcamImage: WebcamImage | null = null;
  private trigger: Subject<void> = new Subject<void>();

  constructor(private streamService: StreamService) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.WebcamOn = false;
  }

  Start(): void {
    this.trigger.next();
    this.WebcamOn = true;
    console.log("Status of webcam: " + this.WebcamOn);
  }

  Stop(): void {
    this.WebcamOn = false;
    console.log("Status of webcam: " + this.WebcamOn);
  }

  Pause(): void {
    this.WebcamOn = !this.WebcamOn;
  }

  ViewerCount(): number {
    return 0;
  }

  ngAfterViewInit() {
    console.log(this.parentCam);
    let measureCam = this.parentCam.nativeElement.offsetWidth;
    console.log("Div Width is: " + measureCam);
    this.webcam_width = measureCam;
    this.initialized = true;
  }
}
