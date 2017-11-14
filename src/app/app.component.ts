import { Component } from '@angular/core';
import { AutorizacionService } from './services/autorizacion.service'
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import 'rxjs/Rx';
declare var swal: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggeIn:any = false;
  loggedUser:any=null;
  constructor(private autorizacionService:AutorizacionService, private router:Router){
    this.autorizacionService.isLogged()
        .subscribe((result)=>{
          if(result && result.uid){
            this.loggeIn = true;
            setTimeout(()=>{
              this.loggedUser = this.autorizacionService.getUser().currentUser.email;
            },500)
          }else{
            this.loggeIn = false;
          }
        },(error)=>{
          this.loggeIn = false;
        })
  }
  logout(){
    this.autorizacionService.logout();
    swal('Respuesta!','Sesion Cerrada','success');
    this.router.navigate(['lugares']);
  }
}
