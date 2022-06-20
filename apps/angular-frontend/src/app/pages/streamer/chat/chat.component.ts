import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
// import NodeRSA from "encrypt-rsa";
import { Observable } from "rxjs";
import { Chat } from '../../../models/Chat';
import { ChatService } from "../../../services/ChatService";

@Component({
  selector: "the-circle-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit, AfterViewInit {
  initialized: boolean = false;
  @ViewChild('message', { read: ElementRef }) private chatbox: ElementRef;
  chatMessage: Chat = {} as Chat;
  chatMessages: Chat[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  send(message: Chat): void {
    if (message.message) {
      let jsonObj = JSON.parse(localStorage.getItem('currentperson'))
      message.username = jsonObj.name;
      message.timestamp = new Date();
      message.streamer = jsonObj.name;
      //message.signature = this.chatService.getSignature(message.username, message.message, message.timestamp, message.streamer, jsonObj)
      this.chatMessages.push(message);
      for (let o of this.chatMessages) {
        console.log("username: " + o.username);
        console.log("message: " + o.message);
        console.log("timestamp: " + o.timestamp);
        console.log("streamer: " + o.streamer);
        console.log("signature: " + o.signature);
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