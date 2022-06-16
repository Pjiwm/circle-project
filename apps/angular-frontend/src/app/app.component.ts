import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'the-circle-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-frontend';
  
  constructor(public router: Router) {}
}
