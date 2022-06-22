import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
// import NodeRSA from "encrypt-rsa";
import { Observable, Subscription, timer, map } from "rxjs";
import { ChatMessage, Room } from '../../../../../../../libs/models'
import { RoomService } from "../../../services/room.service";
import { PersonService } from "../../../services/person.service";
import { ChatService } from "../../../services/chat.service";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "the-circle-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit, AfterViewInit {
  // initialized: boolean = false;
  @ViewChild('message', { read: ElementRef }) private chatbox: ElementRef;
  chatMessage: ChatMessage = {} as ChatMessage;
  chatMessages: ChatMessage[] = [];
  room: Room;
  timerSubscription: Subscription;

  constructor(private route: ActivatedRoute, private chatService: ChatService, private roomService: RoomService, private personService: PersonService, private authService: AuthService) { }


  ngAfterViewInit(): void {
    console.log("Test");
    this.route.paramMap.subscribe((params) => {
      console.log('Room with ID:', params.get('id'));
      this.roomService.getById(params.get('id')).subscribe((room) => {
        console.log('Room:', room);
        this.room = room;

        // timer(0, 10000) call the function immediately and every 4 seconds 
        this.timerSubscription = timer(0, 4000).pipe(
          map(() => {
            this.getMessages();
          })
        ).subscribe();
      });
    });

  }

  ngOnInit(): void {
  }

  getMessages(): void {
    console.log("getMessages() called")
    this.chatService.getAllMessages(this.room._id).subscribe((chatMessages) => {
      this.chatMessages = chatMessages;
    });
  }

  send(chatMessage: ChatMessage): void {
    if (chatMessage.message) {
      this.authService.getPersonFromLocalStorage().subscribe((currentPerson) => {
        // let currentPerson = JSON.parse(localStorage.getItem('currentperson')) as Person
        this.personService.getById(currentPerson._id).subscribe((person) => {
          chatMessage.person = person;
          chatMessage.room = this.room;
          chatMessage.dateTime = new Date();
          this.chatService.sendMessage(chatMessage);
          // this.chatMessages.push(chatMessage);
          // for (let m of this.chatMessages) {
          //   console.log("username: " + m.person);
          //   console.log("message: " + m.message);
          //   console.log("timestamp: " + m.dateTime);
          //   console.log("signature: " + m.signature);
          // }
     
        })
      })

      // _id: string;
      // person: Person;
      // room: Room;
      // message: string;
      // dateTime: Date;
      // signature: string;

      // if (this.initialized == true) {
      this.chatbox.nativeElement.value = '';
      // }
    }
  }

  // Destroy the timer of the chat
  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  // decryptMessage(): void {
  //   const encryptRSA = encryptRsa.
  //   const decryptedMessage = NodeRSA.
  // }

}