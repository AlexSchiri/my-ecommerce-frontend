import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ArticoliCardComponent } from './components/articoli-card/articoli-card.component';
import { ArticoliComponent } from './pages/articoli/articoli.component';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { ErrorComponent } from './pages/error/error.component';
import { FormsModule } from '@angular/forms';
import { GestartComponent } from './pages/gestart/gestart.component';
import { GridArticoliComponent } from './pages/grid-articoli/grid-articoli.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegistrazioneComponent } from './pages/registrazione/registrazione.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { DetailArticoliComponent } from './pages/detail-articoli/detail-articoli.component';
import { AuthInterceptorService } from 'src/services/interceptors/auth-interceptor.service';
import { CartComponent } from './pages/cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ArticoliComponent,
    LogoutComponent,
    GridArticoliComponent,
    ArticoliCardComponent,
    RegistrazioneComponent,
    GestartComponent,
    DetailArticoliComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
