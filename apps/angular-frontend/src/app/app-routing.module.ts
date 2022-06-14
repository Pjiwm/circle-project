import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BrowseComponent } from "./pages/browse/browse.component";
import { FollowingComponent } from "./pages/following/following.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { StreamComponent } from './pages/streamer/stream/stream.component';

const routes: Routes = [
  { path: "browse", pathMatch: "full", component: BrowseComponent },
  { path: "following", pathMatch: "full", component: FollowingComponent },
  { path: "streamer", pathMatch: "full", component: StreamComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
