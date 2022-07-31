import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
 
  projects: any[] = [];
  public show = false;

  constructor(private _peticionesService: PeticionesService,
              private toastr: ToastrService,
              public afAuth: AngularFireAuth) {
    
   }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects(){
    this._peticionesService.getProyecto().subscribe(data => {
      this.projects = [];
      data.forEach((element:any) => {
      this.projects.push({
        id: element.payload.doc.id,
        ...element.payload.doc.data()
      })
      });
    });
  }

    eliminarProyecto(id: string){
    this._peticionesService.eliminarProyecto(id).then(() => {
      this.toastr.error('El proyecto fue eliminado con exito!', 'Proyecto eliminado', {
        positionClass: 'toast-top-right'
      });
    }).catch(error => {
    });
  }

    showModal(){
    this.show = true;
  }
}
