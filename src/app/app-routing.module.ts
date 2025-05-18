import { RouterModule, Routes } from '@angular/router';

import { ArticoliComponent } from './pages/articoli/articoli.component';
import { ErrorComponent } from './pages/error/error.component';
import { GestartComponent } from './pages/gestart/gestart.component';
import { GridArticoliComponent } from './pages/grid-articoli/grid-articoli.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { NgModule } from '@angular/core';
import { RegistrazioneComponent } from './pages/registrazione/registrazione.component';
import { RouteGuardService } from '../services/route-guard.service';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { DetailArticoliComponent } from './pages/detail-articoli/detail-articoli.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  {path:'', component: LoginComponent, canActivate:[RouteGuardService]},
  {path:'login', component: LoginComponent, canActivate:[RouteGuardService]},
  {path:'signup', component : RegistrazioneComponent},
  {path:'welcome/:userid', component: WelcomeComponent, canActivate:[RouteGuardService]},
  {path:'articoli', component : ArticoliComponent, canActivate:[RouteGuardService]},
  {path:'articoli/grid', component : GridArticoliComponent, canActivate:[RouteGuardService]},
  {path:'gestart/:codart', component : GestartComponent, canActivate:[RouteGuardService]},
  {path:'articolo/:codart', component : DetailArticoliComponent, canActivate:[RouteGuardService]},
  {path:'gestart', component : GestartComponent, canActivate:[RouteGuardService]},
  {path:'cart', component : CartComponent},
  {path:'logout', component : LogoutComponent},
  {path:'**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
