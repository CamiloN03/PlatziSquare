import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database/database";
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
@Injectable()
export class LugaresService{
  API_ENDPOINT = "https://platzisquare-93e59.firebaseio.com";
  lugares:any =[
    {id: 1, plan: 'pagado', cercania: 1, distancia: 1, active: true, nombre:'IQ Outsoursing'},
    {id: 2, plan: 'gratuito', cercania: 1, distancia: 1.2, active: true, nombre:'Florería la Gardenia'},
    {id: 3, plan: 'pagado', cercania: 2, distancia: 5, active: true, nombre:'Donas la pasadita'},
    {id: 4, plan: 'pagado', cercania: 2, distancia: 10, active: true, nombre:'Veterinaría Huellitas felices'},
    {id: 5, plan: 'gratuito', cercania: 3, distancia: 15, active: false, nombre:'Gimnasio Floresta'},
    {id: 6, plan: 'pagado', cercania: 3, distancia: 35, active: false, nombre:'Heladeria Florer'},
    {id: 7, plan: 'gratuito', cercania: 4, distancia: 120, active: true, nombre:'Peluqueria Detroid'},
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
  }
  public buscarLugar(id){
    return this.lugares.filter((lugar) => { return lugar.id == id})[0] || null;
  }
  public editarLugar(lugar){
    this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
  }
  public guardarLugar(lugar){
    //this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
    const headers = new Headers({"Content-Type":"application/json"});
    return this.http.post(this.API_ENDPOINT+'/lugares.json',lugar,{headers:headers})
               .subscribe();
  }
  public obtenerGeoData(direccion){
    return this.http.get('http://maps.google.com/maps/api/geocode/json?address='+direccion);
  }
  public getLugar(id){
    return this.afDB.object('lugares/'+id);
  }
}
