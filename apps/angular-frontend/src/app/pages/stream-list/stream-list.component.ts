import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PersonService } from "../../services/person.service";
import { RoomService } from "../../services/room.service";
import { FollowService } from "../../services/follow.service";
import { Person, Room } from "../../../../../../libs/models";
import { Location } from '@angular/common'
import { faPlay, faStop, faArrowRightLong, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import Hls from 'hls.js';
import { environment } from '../../../environments/environment';

@Component({
  selector: "the-circle-stream-list",
  templateUrl: "./stream-list.component.html",
  styleUrls: ["./stream-list.component.scss"],
})
export class StreamListComponent implements OnInit {
  isBrowsePage: boolean;
  videoSource1 = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  videoSource2 = 'https://jsoncompare.org/LearningContainer/SampleFiles/Video/MP4/sample-mp4-file.mp4';
  hoveredVideo = "";
  playingStreamArray: string[] = [];
  persons: Person[];
  rooms: Room[] = [];
  followedRoomsIds: string[] = [];
  FaPlay = faPlay;
  FaStop = faStop;
  FaArrowRight = faArrowRightLong;
  FaDoorOpen = faDoorOpen;

  constructor(
    public router: Router,
    public personService: PersonService,
    public roomService: RoomService,
    public followService: FollowService,
    private location: Location) { }

  ngOnInit(): void {
    this.personService.getFollowed().subscribe((followedRooms) => {
      followedRooms.forEach(room => {
        this.followedRoomsIds.push(room._id);
      });

      if (this.router.url === "/browse") {
        // Browse page
        this.isBrowsePage = true;
        this.roomService.getAll().subscribe((rooms) => {
          if (rooms.length != null) {
            for (let room of rooms) {
              this.getStreamer(room);
            }
            this.rooms = rooms
          }

          this.followService.getEmittedFollowers().subscribe(value => {
            this.followedRoomsIds = [];

            value.forEach(room => {
              this.followedRoomsIds.push(room._id)
            });
          });
        })
      } else {
        // Followed page
        this.isBrowsePage = false;
        if (followedRooms.length != null) {
          for (let room of followedRooms) {
            this.getStreamer(room)
          }
          this.rooms = followedRooms;
        }

        this.followService.getEmittedFollowers().subscribe(value => {
          this.rooms = value;
        });
      }
    });
  }

  // Get Streamer based on room id
  getStreamer(room: Room): Room {
    const temp = room.streamer as unknown
    const name = temp as string
    this.personService.getById(name).subscribe((person) => {
      room.streamer = person;
    })
    console.log(room)
    return room
  }

  mouseOnHover(video: string, room: Room) {
    if (!this.playingStreamArray.includes(video)) {
      console.log("mouseOnHover for video:", video);
      console.log(`mouseOnHover for avatar: ${video}-avatar`)
      console.log(this.playingStreamArray)

      setTimeout(() => {
        this.hoveredVideo = video;
        this.getHlsStream(video, room);
      }, 300);

      setTimeout(() => {
        let vid = document.getElementById(video) as HTMLMediaElement;
        console.log("Element in hover play preview?", vid);
        if (vid != null && !this.playingStreamArray.includes(video)) {
          vid.muted = true;
          vid.play();
        }
      }, 600);

      setTimeout(() => {
        let vid = document.getElementById(video) as HTMLMediaElement;
        console.log("Element in hover 7 sec preview?", vid);
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', vid);
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.hoveredVideo);
        if (vid != null && !this.playingStreamArray.includes(video)) {
          console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          vid.pause();
          this.hoveredVideo = "";
        }
      }, 7000);
    }
  }

  mouseOnLeave(video: string) {
    if (!this.playingStreamArray.includes(video)) {
      console.log("mouseOnLeave for video:", video);
      console.log(`mouseOnLeave for avatar: ${video}-avatar`);
      console.log(this.playingStreamArray)
      setTimeout(() => {
        let vid = document.getElementById(video) as HTMLMediaElement
        vid.pause();
        this.hoveredVideo = "";
      }, 330);
    }
  }

  startStopVideo(video: string, room: Room): void {
    console.log("startStopVideo for video:", video);
    if (!this.playingStreamArray.includes(video)) {
      this.playingStreamArray.push(video);
    }

    setTimeout(() => {
      let vid = document.getElementById(video) as HTMLMediaElement
      console.log("Element startStop?", vid);
      console.log("Paused?", vid.paused);
      if (vid.paused) {
        console.log(`Video ${video} played`)

        setTimeout(() => {
          this.getHlsStream(video, room);
          vid.play();
        }, 300);
        console.log(this.playingStreamArray);
      } else {
        console.log('Video paused')
        vid.pause();
        vid.currentTime = 0;

        const indexOfObject = this.playingStreamArray.indexOf(video);
        console.log("index of video", indexOfObject);
        this.playingStreamArray.splice(indexOfObject, 1);
        console.log(this.playingStreamArray);
      }
    }, 300);
  }

  followRoom(room: Room): void {
    this.followService.followRoom(room);
  }

  unfollowRoom(room: Room) {
    this.followService.unfollowRoom(room);
  }

  previousPage() {
    this.location.back();
  }

  getHlsStream(video: string, room: Room) {
    if (Hls.isSupported()) {
      var hls = new Hls();
      // bind them together
      hls.attachMedia(document.getElementById(video) as HTMLMediaElement);
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
  }

  getLink(isLive: Boolean, roomId: string): string {
    if (isLive) {
      return "/room/" + roomId
    }

    if (this.router.url == '/following') {
      return "/following";
    } else {
      return "/browse";
    }
  }
}