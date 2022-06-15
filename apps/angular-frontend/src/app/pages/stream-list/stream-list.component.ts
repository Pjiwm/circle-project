import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'the-circle-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit {
  isBrowsePage: boolean;

  constructor(public router: Router) { }

  ngOnInit(): void {
    if(this.router.url === "/browse") {
      this.isBrowsePage = true
    } else {
      this.isBrowsePage = false
    }
  } 
}
