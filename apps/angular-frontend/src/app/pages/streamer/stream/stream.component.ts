import {
  Component,
  OnInit
} from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Room } from "../../../../../../../libs/models";
import { RoomService } from "../../../services/room.service";
import { PersonService } from "../../../services/person.service";
import { FollowService } from "../../../services/follow.service";
import { AuthService } from "../../../services/auth.service";
import { faPlay, faStop, faArrowLeftLong, faDoorOpen, faEye } from "@fortawesome/free-solid-svg-icons";
import { Location } from '@angular/common'
import  Hls  from 'hls.js';
import { environment } from '../../../../environments/environment';

@Component({
  selector: "the-circle-stream",
  templateUrl: "./stream.component.html",
  styleUrls: ["./stream.component.scss"],
})
export class StreamComponent implements OnInit {
  videoSource1: string = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  videoSource2: string = 'https://jsoncompare.org/LearningContainer/SampleFiles/Video/MP4/sample-mp4-file.mp4';
  room: Room;
  FaPlay = faPlay;
  FaStop = faStop;
  FaArrowLeft = faArrowLeftLong;
  FaDoorOpen = faDoorOpen;
  FaEye = faEye;
  isFollowed = false;
  // @ViewChild("videoStream", { static: true }) videostream: ElementRef;

  constructor(private route: ActivatedRoute, private roomService: RoomService, private personService: PersonService,
    private location: Location, private authService: AuthService, private followService: FollowService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log('Room with ID:', params.get('id'));
      this.roomService.getById(params.get('id')).subscribe((room) => {
        console.log('Room:', room);
        this.room = room;
        
        this.personService.getById(room.streamer as unknown as string).subscribe((person) => {
          this.room.streamer = person;

          console.log('HLS is supported', Hls.isSupported())
          if (Hls.isSupported()) {
            var hls = new Hls();
            // bind them together
            hls.attachMedia(document.getElementById('videoStream') as HTMLMediaElement);
            hls.on(Hls.Events.MEDIA_ATTACHED, function () {
              console.log('video and hls.js are now bound together !');
              console.log('streamer naam:', room.streamer.name);
              hls.loadSource(`${environment.mediaUrl}/${room.streamer.name}-streams/${room.streamer.name}.m3u8`);
              hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                console.log(
                  'manifest loaded, found ' + data.levels.length + ' quality level'
                );
              });
            });
          }

          this.personService.getById(this.authService.currentPerson$.value._id).subscribe((currentPerson) => {
            if (currentPerson.followed.some(e => e._id == this.room._id)) {
              console.log('Room is followed');
              this.isFollowed = true;
            }
          })
        })
      });
    });
  }

  followRoom(): void {
    this.followService.followRoom(this.room);
    this.isFollowed = true;
  }

  unfollowRoom() {
    this.followService.unfollowRoom(this.room);
    this.isFollowed = false;
  }

  previousPage() {
    this.location.back();
  }
}