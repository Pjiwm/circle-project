import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { StreamComponent } from "./pages/streamer/stream/stream.component";
import { StreamService } from "./services/StreamService";
import { HttpClientModule } from "@angular/common/http";
import { WebcamModule } from "ngx-webcam";
import { ChatComponent } from "./pages/streamer/chat/chat.component";

import { AppRoutingModule } from "./app-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { BrowseComponent } from "./pages/browse/browse.component";
import { FollowingComponent } from "./pages/following/following.component";
import { SidenavComponent } from "./shared/sidenav/sidenav.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    AppComponent,
    StreamComponent,
    ChatComponent,
    NavbarComponent,
    PageNotFoundComponent,
    BrowseComponent,
    FollowingComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    WebcamModule,
    BrowserModule, 
    FontAwesomeModule, 
    AppRoutingModule, 
    NgbModule
  ],
  providers: [StreamService],  
  bootstrap: [AppComponent],
})
export class AppModule {}
