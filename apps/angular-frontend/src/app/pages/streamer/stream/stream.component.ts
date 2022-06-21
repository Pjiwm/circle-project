import {
  Component,
  OnInit
} from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Room } from "../../../../../../../libs/models";
import { RoomService } from "../../../services/room.service";
import { PersonService } from "../../../services/person.service";
import { faPlay, faStop, faArrowLeftLong, faDoorOpen, faEye } from "@fortawesome/free-solid-svg-icons";
import { Location } from '@angular/common'

@Component({
  selector: "the-circle-stream",
  templateUrl: "./stream.component.html",
  styleUrls: ["./stream.component.scss"],
})
export class StreamComponent implements OnInit {
  videoSource1 : string = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  videoSource2 : string = 'https://jsoncompare.org/LearningContainer/SampleFiles/Video/MP4/sample-mp4-file.mp4';
  room: Room;
  FaPlay = faPlay;
  FaStop = faStop;
  FaArrowLeft = faArrowLeftLong;
  FaDoorOpen = faDoorOpen;
  FaEye = faEye;
  displayWelcomeMessage = true;

  constructor(private route: ActivatedRoute, private roomService: RoomService, private personService: PersonService,
    private location: Location) {
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
}