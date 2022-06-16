import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PersonService } from "../../services/person.service";
import { Person, Room } from "../../../../../../libs/models";

@Component({
  selector: "the-circle-stream-list",
  templateUrl: "./stream-list.component.html",
  styleUrls: ["./stream-list.component.scss"],
})
export class StreamListComponent implements OnInit {
  isBrowsePage: boolean;
  persons: Person[];
  rooms: Room[] = [];

  constructor(public router: Router, public PersonService: PersonService) {}

  ngOnInit(): void {
    if (this.router.url === "/browse") {
      // Browse page
      this.isBrowsePage = true;
    } else {
      // Followed page
      this.isBrowsePage = false;
      this.PersonService.getFollowed().subscribe((rooms) => {
        if(rooms.length != 0) {
          for(let room of rooms) {
            const temp = room.streamer as unknown
            const name = temp as string
            this.PersonService.getById(name).subscribe((person) => {
              room.streamer = person;
            })
          }
          console.log(rooms[0]._id);
          this.rooms = rooms
        }
  
      });

    }
  }
}
