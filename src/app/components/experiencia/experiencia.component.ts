import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experiencias: any[] = [];

  constructor(private _peticionesService: PeticionesService,
              private toastr: ToastrService,
              public afAuth: AngularFireAuth) { 
    
  }

  ngOnInit(): void {
    this.getExperiencia()
  }

  getExperiencia(){
    this._peticionesService.getExperiencia().subscribe(data => {
      this.experiencias = [];
      data.forEach((element:any) => {
      this.experiencias.push({
        id: element.payload.doc.id,
        ...element.payload.doc.data()
      })
      });
    });
  }

  eliminarExperiencia(id: string){
    this._peticionesService.eliminarExperiencia(id).then(() => {
      this.toastr.error('La experiencia fue eliminada con exito!', 'Experiencia eliminada', {
        positionClass: 'toast-top-right'
      });
    }).catch(error => {
      console.log(error)
    });
  }

}
