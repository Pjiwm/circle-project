import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StreamComponent } from "./pages/streamer/stream/stream.component";
import { StreamService } from "./services/StreamService";
import { HttpClientModule } from "@angular/common/http";
import { WebcamModule } from "ngx-webcam";
import { ChatComponent } from "./pages/streamer/chat/chat.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { SidenavComponent } from "./shared/sidenav/sidenav.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { LoginComponent } from "./pages/login/login.component";
import { LoggedInAuthGuard } from "./services/auth.guard";
import { StreamListComponent } from './pages/stream-list/stream-list.component';

@NgModule({
  declarations: [
    AppComponent,
    StreamComponent,
    ChatComponent,
    NavbarComponent,
    PageNotFoundComponent,
    SidenavComponent,
    LoginComponent,
    StreamListComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FontAwesomeModule,
    WebcamModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [LoggedInAuthGuard, StreamService],
  bootstrap: [AppComponent],
})
export class AppModule {}
