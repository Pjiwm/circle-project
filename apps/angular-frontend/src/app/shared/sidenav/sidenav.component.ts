import { Component, OnInit } from "@angular/core";
import { PersonService } from "../../services/person.service";
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { Person, Room } from "../../../../../../libs/models";

@Component({
  selector: "the-circle-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit {

  FaEye = faEye
  rooms: Room[];

  constructor(public PersonService: PersonService) {}

  ngOnInit(): void {
    this.PersonService.getFollowed().subscribe((rooms) => {
      if (rooms.length != null) {
        for (let room of rooms) {
          this.getStreamer(room)
        }
        this.rooms = rooms
      }
    });
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
}
