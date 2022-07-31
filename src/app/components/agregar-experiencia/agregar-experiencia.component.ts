import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-experiencia',
  templateUrl: './agregar-experiencia.component.html',
  styleUrls: ['./agregar-experiencia.component.css']
})
export class AgregarExperienciaComponent implements OnInit {

  experiencia: UntypedFormGroup;
  submitted = false;
  loading = false;
  public show = false;
  id: string | null;
  header = 'Agregar experiencia';
  boton = 'Agregar'

  constructor(private _peticionesService: PeticionesService,
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRoute: ActivatedRoute) {
      this.experiencia = this.fb.group({
        fecha: ['', Validators.required],
        titulo: ['', Validators.required],
        descripcion: ['', Validators.required]
      })
      this.id = this.aRoute.snapshot.paramMap.get('id');
}

  ngOnInit(): void {    
    this.editar();
  }

  agregarEditarExperiencia(){
    this.submitted = true;
    if(this.experiencia.invalid){
      return;
    }
    if(this.id === null){
      this.agregarExperiencia();
    }else {
      this.editarExperiencia(this.id);
    }

  }

  agregarExperiencia(){
    const experiencia: any = {
      titulo: this.experiencia.value.titulo,
      descripcion: this.experiencia.value.descripcion,
      fecha: this.experiencia.value.fecha,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._peticionesService.agregarExperiencia(experiencia).then(() =>{
      this.toastr.success('Habilidad registrada con exito!', 'Habilidad registrada', {
        positionClass: 'toast-top-right'
      });
      this.loading = false;
      this.router.navigate(['/portfolio'], {fragment: 'experiencias'})
    })
  }


  editar(){
    if(this.id !== null){
      this.boton = 'Editar'
      this.header = 'Editar experiencia'
    this.loading = true;
    this._peticionesService.getExperiencias(this.id).subscribe(data =>{
            this.loading = false;
            this.experiencia.patchValue({
             titulo: data.payload.data()['titulo'],
             descripcion: data.payload.data()['descripcion'],
             fecha: data.payload.data()['fecha']
            })
          })
        }
     }

     editarExperiencia(id: string){
      const experiencia: any = {
        titulo: this.experiencia.value.titulo,
        descripcion: this.experiencia.value.descripcion,
        fecha: this.experiencia.value.fecha,
        fechaActualizacion: new Date()
      }
      this.loading = true;
      this._peticionesService.updateExperiencia(id, experiencia).then(() =>{
        this.loading = false;
        this.toastr.info('La experiencia se actualizó con exito', 'Experiencia actualizada', {
          positionClass: 'toast-top-right'
        });
        this.router.navigate(['/portfolio'], {fragment: 'experiencias'})
      });
    }

}
