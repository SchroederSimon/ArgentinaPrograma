import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: [
    './skills.component.css'
  ]
})
export class SkillsComponent implements OnInit {
  
  skills: any[] = [];
  public show = false;

  constructor(private _peticionesService: PeticionesService,
              private toastr: ToastrService,
              public afAuth: AngularFireAuth
              ) {
     }
  

  ngOnInit(): void {
    this.getSkills()
  }



  getSkills(){
    this._peticionesService.getSkill().subscribe(data => {
      this.skills = [];
      data.forEach((element:any) => {
      this.skills.push({
        id: element.payload.doc.id,
        ...element.payload.doc.data()
      })
      });
    });
  }

    eliminarSkill(id: string){
    this._peticionesService.eliminarSkill(id).then(() => {
      this.toastr.error('El skill fue eliminado con exito!', 'Skill eliminado', {
        positionClass: 'toast-top-right'
      });
    }).catch(error => {
    });
  }

    showModal(){
    this.show = true;
  }
  }    

