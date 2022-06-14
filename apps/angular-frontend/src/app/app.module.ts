import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

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
    NavbarComponent,
    PageNotFoundComponent,
    BrowseComponent,
    FollowingComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule, 
    FontAwesomeModule, 
    AppRoutingModule, 
    NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
