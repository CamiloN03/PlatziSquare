import {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth/auth";
import {Router} from "@angular/router";
import * as firebase from 'firebase/app';
declare var swal: any;
@Injectable()
export class AutorizacionService{
    constructor(private angularFireAuth: AngularFireAuth, private router:Router){
        this.isLogged();
    }
    public facebookLogin(){
      this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
          .then((result) =>{
            console.log(result);
            swal('Respuesta!','Usuario logueado por Facebook!','success');
            this.router.navigate(['lugares']);
          })
          .catch((error)=>{
            console.log(error);
          });
    };
    public login = (email, password) => {
        this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
            .then((response)=>{
                swal('Respuesta!','Usuario logueado con éxito!','success');
                console.log(response);
                this.router.navigate(['lugares']);
            })
            .catch((error)=>{
                swal('Error!','Un error ha ocurrido','error');
                console.log(error);
            })
    };
    public registro = (email, password) => {
        this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((response)=>{
                swal('Respuesta!','Usuario Registrado con éxito!','success');
                console.log(response);
                this.router.navigate(['lugares']);
            })
            .catch((error)=>{
                swal('Error!','Un error ha ocurrido','error');
                console.log(error);
            })
    };
    public isLogged(){
        return this.angularFireAuth.authState;
    };
    public logout(){
      this.angularFireAuth.auth.signOut();
    };

    public getUser(){
      return this.angularFireAuth.auth;
    }
}
