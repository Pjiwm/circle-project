import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
// import NodeRSA from "encrypt-rsa";
import { Observable } from "rxjs";
import { ChatMessage } from '../../../../../../../libs/models'
import { ChatService } from "../../../services/ChatService";

@Component({
  selector: "the-circle-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit, AfterViewInit {
  initialized: boolean = false;
  @ViewChild('message', { read: ElementRef }) private chatbox: ElementRef;
  chatMessage: ChatMessage = {} as ChatMessage;
  chatMessages: ChatMessage[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  send(message: ChatMessage): void {
    if (message.message) {
      let jsonObj = JSON.parse(localStorage.getItem('currentperson'))
      message.person.name = jsonObj.name;
      message.dateTime = new Date();
      message.room.streamer.name = 'test-streamer';
      //message.signature = this.chatService.getSignature(message.username, message.message, message.timestamp, message.streamer, jsonObj)
      this.chatMessages.push(message);
      for (let m of this.chatMessages) {
        console.log("username: " + m.person.name);
        console.log("message: " + m.message);
        console.log("timestamp: " + m.dateTime);
        console.log("streamer: " + m.room.streamer.name);
        console.log("signature: " + m.signature);
      }

      if (this.initialized == true) {
        this.chatbox.nativeElement.value = '';
      }
    }
  }

  ngAfterViewInit(): void {
    this.initialized = true;
  }

  // decryptMessage(): void {
  //   const encryptRSA = encryptRsa.
  //   const decryptedMessage = NodeRSA.
  // }

}