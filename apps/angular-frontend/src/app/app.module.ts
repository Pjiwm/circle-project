import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { StreamComponent } from "./streamer/stream/stream.component";
import {StreamService} from "./services/StreamService"
import {HttpClientModule} from "@angular/common/http"

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomeComponent,
    StreamComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'streamer', component: StreamComponent }
    ], { initialNavigation: "enabledBlocking" }),
  ],
  providers: [StreamService],
  bootstrap: [AppComponent],
})
export class AppModule {}
