import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { trigger, state, style, transition, animate} from '@angular/animations';
declare var swal: any;

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css'],
  animations:[
    trigger('contenedorAnimable',[
      state('inicial',style({
        opacity:0
      })),
      state('final',style({
        opacity:1
      })),
      transition('inicial => final',animate(2000)),
      transition('final => inicial',animate(1000)),
    ])
  ]
})
export class LugaresComponent {
  title = 'PlatziSquare';
  state ='inicial';
  lat: number = 4.6176001;
  lng: number = -74.0702729;
  lugares = null;
  animar(){
    this.state = (this.state === 'final') ? 'inicial' : 'final';
  }
  constructor(private lugaresService: LugaresService){
    //this.lugares = lugaresService.getLugares();
    lugaresService.getLugares()
                  .subscribe((lugares) =>{
                    this.lugares = lugares;
                    var me = this;
                    me.lugares = Object.keys(me.lugares).map(function (key) { return me.lugares[key]; });
                    this.state = 'final';
                  },error => {
                    if(error.statusText == "Unauthorized")
                    {
                      swal('Información!','Usuario no autenticado!','warning');
                      console.log(error);
                    }
                    else
                    {
                      swal('Error!','Tenemos algo de dificultades, disculpe las molestias','error');
                      console.log(error);
                    }
                  });
  }
}
