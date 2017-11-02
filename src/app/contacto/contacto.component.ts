import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
declare var swal: any;

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  lat: number = 4.6176001;
  lng: number = -74.0702729;
  lugares = null;
  constructor(private lugaresService: LugaresService){
    //this.lugares = lugaresService.getLugares();
    lugaresService.getLugares()
                  .subscribe((lugares) =>{
                    this.lugares = lugares;
                    var me = this;
                    me.lugares = Object.keys(me.lugares).map(function (key) { return me.lugares[key]; });
                    //debugger;
                  },error => {
                    console.log(error);
                    swal('Error!','Tenemos algo de dificultades, disculpe las molestias','error');
                  });
  }
}
