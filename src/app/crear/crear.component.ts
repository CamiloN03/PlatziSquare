import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { ActivatedRoute } from '@angular/router';
declare var swal: any;

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  lugar:any = {};
  id:any = null;
  constructor(private lugaresService: LugaresService,private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    if(this.id != 'new'){
      this.lugaresService.getLugar(this.id)
          .subscribe((lugar)=>{
            this.lugar = lugar;
          });
    }
  }
  guardarLugar(){
    var direccion = this.lugar.calle +','+ this.lugar.ciudad +','+this.lugar.pais;
    this.lugaresService.obtenerGeoData(direccion)
        .subscribe((result) =>{
          //debugger;
          this.lugar.lat = result.json().results[0].geometry.location.lat;
          this.lugar.lng = result.json().results[0].geometry.location.lng;
          if(this.id != 'new'){
            this.lugaresService.editarLugar(this.lugar);
            swal('Respuesta!','Negocio editado con éxito!','success');
          }else{
            this.lugar.id = Date.now();
            this.lugaresService.guardarLugar(this.lugar);
            swal('Respuesta!','Negocio guardado con éxito!','success');
          }
          this.lugar={};
        });
      }
}
