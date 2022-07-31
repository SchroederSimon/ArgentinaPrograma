import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  loading = false;
  public show = false;
  skillz: UntypedFormGroup;
  submitted = false;
  imagenes: any[] = [];
  id: string | null;
  titulo = 'Agregar skill';
  boton = 'Agregar'

  constructor(private _peticionesService: PeticionesService,
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private router: Router) {
      this.skillz = this.fb.group({
        nombre: ['', Validators.required],
        level: ['', Validators.required],
        imageUrl: ['', Validators.required]
      })
      this.id = this.aRoute.snapshot.paramMap.get('id');
}

  ngOnInit(): void {
    this.editar();
  }

  agregarEditarSkill(){
    this.submitted = true;
    if(this.skillz.invalid){
      return;
    }
    if(this.id === null){
      this.agregarSkill();
    }else {
      this.editarSkill(this.id);
    }

  }

  agregarSkill(){
    const skill: any = {
      nombre: this.skillz.value.nombre,
      level: this.skillz.value.level,
      imageUrl: this.imagenes,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._peticionesService.agregarSkill(skill).then(() =>{
      this.toastr.success('Habilidad registrada con exito!', 'Habilidad registrada', {
        positionClass: 'toast-top-right'
      });
      this.loading = false;
      this.router.navigate(['/portfolio'], {fragment: 'skill'})
    })
  }

  cargarImagen(event: any){
    let archivos = event.target.files
    let reader = new FileReader();
    reader.readAsDataURL(archivos[0]);
    reader.onloadend = () => {
      this.imagenes.push(reader.result)
    }
  }
  
  editarSkill(id: string){
    const skill: any = {
      nombre: this.skillz.value.nombre,
      level: this.skillz.value.level,
      imageUrl: this.imagenes,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._peticionesService.updateSkill(id, skill).then(() =>{
      this.loading = false;
      this.toastr.info('El skill se actualizo con exito', 'Skill actualizado', {
        positionClass: 'toast-top-right'
      });
      this.router.navigate(['/portfolio'], {fragment: 'skill'})
    });
  }
  editar(){
    if(this.id !== null){
    this.titulo = 'Editar skill'
    this.boton = 'Editar'
    this.loading = true;
    this._peticionesService.getHabilidad(this.id).subscribe(data =>{
            this.loading = false;
            this.skillz.patchValue({
             nombre: data.payload.data()['nombre'],
             level: data.payload.data()['level'],
             imgUrl: data.payload.data(this.imagenes)['imageUrl']
            })
          })
        }
     }


}
