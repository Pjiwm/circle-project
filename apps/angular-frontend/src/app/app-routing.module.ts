import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BrowseComponent } from "./pages/browse/browse.component";
import { FollowingComponent } from "./pages/following/following.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { LoginComponent } from "./pages/login/login.component";
import { LoggedInAuthGuard } from "./services/auth.guard";

const routes: Routes = [
  { path: "login", pathMatch: "full", component: LoginComponent },
  { path: "browse", pathMatch: "full", component: BrowseComponent, canActivate: [LoggedInAuthGuard], },
  { path: "following", pathMatch: "full", component: FollowingComponent, canActivate: [LoggedInAuthGuard], },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
