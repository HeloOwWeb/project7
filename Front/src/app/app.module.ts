import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Component simple
import { HeaderComponent } from './header/header.component';
//Materials
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
//Services
import { UserService } from './services/user.service';
import { PublicationService } from './services/publication.service';
import { GiphyService } from './services/giphy.service';
import { CookieService } from 'ngx-cookie-service';
import { InterceptorService } from './services/interceptor.service';
import { CommentsService } from './services/comments.service';
import { EmotionsService } from './services/emotions.service';
import { KeyService } from './services/key.service';
//Langue: Français
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
import { LOCALE_ID } from '@angular/core';
import { GuardsService } from './services/guards.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    GuardsService,
    {
      provide: LOCALE_ID,
      useValue: "fr-FR"
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    UserService,
    PublicationService,
    GiphyService,
    CookieService,
    CommentsService,
    EmotionsService,
    KeyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
