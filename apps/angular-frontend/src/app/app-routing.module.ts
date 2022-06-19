import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { StreamComponent } from './pages/streamer/stream/stream.component';
import { LoginComponent } from "./pages/login/login.component";
import { LoggedInAuthGuard } from "./services/auth.guard";
import { StreamListComponent } from "./pages/stream-list/stream-list.component";

const routes: Routes = [
  { path: "login", pathMatch: "full", component: LoginComponent },
  { path: "browse", pathMatch: "full", component: StreamListComponent, canActivate: [LoggedInAuthGuard], },
  {
    path: "following", pathMatch: "full", component: StreamListComponent, canActivate: [LoggedInAuthGuard]
  },
  { path: "following/:id", pathMatch: "full", component: StreamComponent, canActivate: [LoggedInAuthGuard], },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
