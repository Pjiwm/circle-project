import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  HostListener
} from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Subject } from "rxjs";
import { Room } from "../../../../../../../libs/models";
import { RoomService } from "../../../services/room.service";
import { PersonService } from "../../../services/person.service";
import { faPause, faPlay, faStop, faArrowLeft, faArrowLeftLong, faDoorOpen, faEye } from "@fortawesome/free-solid-svg-icons";
import { Location } from '@angular/common'

@Component({
  selector: "the-circle-stream",
  templateUrl: "./stream.component.html",
  styleUrls: ["./stream.component.scss"],
})
export class StreamComponent implements OnInit, AfterViewInit {
  @ViewChild("parentCam") parentCam: ElementRef;

  room: Room;
  FaPlay = faPlay;
  FaPause = faPause;
  FaStop = faStop;
  FaArrowLeft = faArrowLeftLong;
  FaDoorOpen = faDoorOpen;
  FaEye = faEye;
  WebcamOn = false;
  screenWidth: any;
  webcam_width = 200;
  measureCam = 100;
  initialized = false;
  displayWelcomeMessage = true;
  videoSource1 = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  @HostListener("window:resize", ["$event"])
  getScreenSize(event?) {
    if (this.initialized) {
      let measureCam = this.parentCam.nativeElement.offsetWidth;
      console.log("Div Width is: " + measureCam);
      this.webcam_width = measureCam;
    } else {
      this.screenWidth = window.innerWidth;
      this.webcam_width = this.screenWidth;
      console.log(this.screenWidth);
    }
  }

  private trigger: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private roomService: RoomService, private personService: PersonService,
    private location: Location) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log('Room with ID:', params.get('id'));
      this.roomService.getById(params.get('id')).subscribe((room) => {
        console.log('Room:', room);
        this.room = room;
        this.personService.getById(room.streamer as unknown as string).subscribe((person) => {
          console.log('Streamer with ID:', person._id);
          this.room.streamer = person;
        })
      });
    });
    // setTimeout(() => {
    //   this.displayWelcomeMessage = false;
    // }, 4000);
  }

  previousPage() {
    this.location.back();
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
