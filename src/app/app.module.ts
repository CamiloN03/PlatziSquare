import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
import { ResaltarDirective } from './directives/resaltar.directive';
import { ContarClicksDirective } from './directives/contarclicks.directive';
import { Routes, RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle/detalle.component';
import { LugaresComponent } from './lugares/lugares.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LugaresService } from './services/lugares.service';
import { MyGuard } from './services/my-guard.service';
import { AutorizacionService } from './services/autorizacion.service';
import { CrearComponent } from './crear/crear.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HttpModule } from '@angular/http';
import { LinkifystrPipe } from './pipes/linkifystr.pipe';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  {path:'',component: LugaresComponent},
  {path:'lugares',component: LugaresComponent},
  {path:'detalle/:id',component: DetalleComponent},
  {path:'contacto',component: ContactoComponent},
  {path:'crear/:id',component: CrearComponent, canActivate:[MyGuard]},
  {path:'login',component: LoginComponent},
  {path:'registro',component: RegistroComponent},
];
export const firebaseConfig = {
    apiKey: "AIzaSyBzTUVRyLlJMR75kurmeYPSWdV4IVgT0Jk",
    authDomain: "platzisquare-93e59.firebaseapp.com",
    databaseURL: "https://platzisquare-93e59.firebaseio.com",
    storageBucket: "platzisquare-93e59.appspot.com",
    messagingSenderId: "995002659627"
};
@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective,
    DetalleComponent,
    LugaresComponent,
    ContactoComponent,
    CrearComponent,
    LoginComponent,
    RegistroComponent,
    LinkifystrPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCG9TgVZ1ec5kgZGbyzspI96bMRoIpyV3M'
    }),
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [LugaresService, AutorizacionService, MyGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
