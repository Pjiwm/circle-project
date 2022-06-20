import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PersonService } from "../../services/person.service";
import { RoomService } from "../../services/room.service";
import { Person, Room } from "../../../../../../libs/models";

@Component({
  selector: "the-circle-stream-list",
  templateUrl: "./stream-list.component.html",
  styleUrls: ["./stream-list.component.scss"],
})
export class StreamListComponent implements OnInit {
  isBrowsePage: boolean;
  videoClicked = false;
  isPlaying = false;
  videoSource1 = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  videoSource2 = 'https://jsoncompare.org/LearningContainer/SampleFiles/Video/MP4/sample-mp4-file.mp4';
  isVideo = false;
  hoveredVideo = "";
  playedVideo = ""
  playingStreamArray: string[] = [];
  persons: Person[];
  rooms: Room[] = [];

  constructor(
    public router: Router,
    public PersonService: PersonService,
    public RoomService: RoomService) { }

  ngOnInit(): void {
    if (this.router.url === "/browse") {
      // Browse page
      this.isBrowsePage = true;
      this.RoomService.getAll().subscribe((rooms) => {
        if (rooms.length != 0) {
          for (let room of rooms) {
            this.getStreamer(room);
          }
          this.rooms = rooms
        }
      })
    } else {
      // Followed page
      this.isBrowsePage = false;
      this.PersonService.getFollowed().subscribe((rooms) => {
        console.log("Rooms:" + rooms)
        if (rooms.length != 0) {
          for (let room of rooms) {
            this.getStreamer(room)
          }
          this.rooms = rooms
        }
      });

    }
  }

  // Get Streamer based on room id
  getStreamer(room: Room): Room {
    const temp = room.streamer as unknown
    const name = temp as string
    this.PersonService.getById(name).subscribe((person) => {
      room.streamer = person;
    })
    console.log(room)
    return room
  }

  mouseOnHover(video: string) {
    if (!this.playingStreamArray.includes(video)) {
      console.log("mouseOnHover for video:", video);
      console.log(`mouseOnHover for avatar: ${video}-avatar`)
      console.log(this.playingStreamArray)
      this.hoveredVideo = video;

      setTimeout(() => {
        let vid = document.getElementById(video) as HTMLVideoElement;
        console.log("Element in hover play preview?", vid);
        vid.muted = true;
        vid.play();
      }, 300);

      setTimeout(() => {
        let vid = document.getElementById(video) as HTMLVideoElement;
        console.log("Element in hover 7 sec preview?", vid);
        if (vid != null && !this.playingStreamArray.includes(video)) {
          this.playingStreamArray.includes(video)
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

      let vid = document.getElementById(video) as HTMLVideoElement
      vid.pause();
      this.hoveredVideo = "";
    }
  }

  startStopVideo(video: string): void {
    console.log("startStopVideo for video:", video);
    if (!this.playingStreamArray.includes(video)) {
      this.playingStreamArray.push(video);
    }

    setTimeout(() => {
      let vid = document.getElementById(video) as HTMLVideoElement
      console.log("Element startStop?", vid);
      console.log("Paused?", vid.paused);
      if (vid.paused) {
        console.log(`Video ${video} played`)

        setTimeout(() => {
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

  // startStopVideo(video: string): void {
  //   // this.videoClicked = true;
  //   if (!this.isPlaying) {
  //     console.log(`Video ${video} played`)
  //     this.isVideo = true;
  //     this.isPlaying = true;
  //     setTimeout(() => {
  //       this.videoPlayer.nativeElement.play();
  //     }, 500);
  //   } else {
  //     console.log('Video paused')
  //     // const vid = document.getElementById("myVideo") as HTMLVideoElement
  //     // vid.pause();
  //     // this.videoPlayer.nativeElement.currentTime = 0;
  //     this.videoPlayer.nativeElement.pause();
  //     this.isVideo = false;
  //     this.isPlaying = false;
  //   }
  // }

  // stopVideo(): void {
  //   this.videoClicked = false;
  //   this.isVideo = false;
  //   this.videoPlayer.nativeElement.pause();
  //   // this.videoPlayer.nativeElement.
  // }

  // makeBig() {
  //   this.videoPlayer.nativeElement.width = 620;
  // }

  // makeSmall() {
  //   this.videoPlayer.nativeElement.width = 380;
  // }

  // makeNormal() {
  //   this.videoPlayer.nativeElement.width = 480;
  // }
}