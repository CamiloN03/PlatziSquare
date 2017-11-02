import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database/database";
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
declare var swal: any;
@Injectable()
export class LugaresService{
  API_ENDPOINT = "https://platzisquare-93e59.firebaseio.com";
  lugares:any =[

  ];
  constructor(private afDB:AngularFireDatabase, private http: Http) {}
  public getLugares(){
    //return this.lugares;
    //return this.afDB.list('lugares/');
    return this.http.get(this.API_ENDPOINT+'/.json')
               .map((resultado)=>{
                 const data = resultado.json().lugares;
                 return data;
               })
    //if(window.localStorage){
    //  var key:any="firebase:authUser:AIzaSyBzTUVRyLlJMR75kurmeYPSWdV4IVgT0Jk:[DEFAULT]";
          //for ( var i = 0, len = localStorage.length; i < len; ++i ) {
          //  key = localStorage.key( i )
          //  console.log("Key: "+key);
          //  otro = localStorage.getItem( localStorage.key( i ) );
          //  console.log("otro: "+otro);
          //}
      /////////////////////
      //let ls:any = localStorage.getItem(key);
      //ls = JSON.parse(ls);
      //console.log('En el storage: ', ls);
      //if (ls == null)
      //{
      //  swal('Verificar!','Realice la autenticación','warning');
      //  return this.http.get('')
      //             .map(result =>{
      //              return this.lugares;
      //             });
      //}
      //else{
      //  return this.http.get(`${this.API_ENDPOINT}/.json?auth=${ls.stsTokenManager.accessToken}`)
      //           .map(result =>{
      //            const data = result.json().lugares;
      //            return data;
      //           });
      //}

    }

  public buscarLugar(id){
    return this.lugares.filter((lugar) => { return lugar.id == id})[0] || null;
  }
  public editarLugar(lugar){
    this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
  }
  public guardarLugar(lugar){
    this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
    //const headers = new Headers({"Content-Type":"application/json"});
    //return this.http.post(this.API_ENDPOINT+'/lugares.json',lugar,{headers:headers})
    //           .subscribe();
  }
  public obtenerGeoData(direccion){
    return this.http.get('http://maps.google.com/maps/api/geocode/json?address='+direccion);
  }
  public getLugar(id){
    return this.afDB.object('lugares/'+id);
  }
}
