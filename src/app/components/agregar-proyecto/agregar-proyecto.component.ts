import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})

export class AgregarProyectoComponent implements OnInit {
  loading = false;
  public show = false;
  proyectos: UntypedFormGroup;
  submitted = false;
  imagenes: any[] = [];
  id: string | null;
  header = 'Agregar proyecto';
  boton = 'Agregar'

  constructor(private _peticionesService: PeticionesService,
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private router: Router) {
      this.proyectos = this.fb.group({
        proyecto: ['', Validators.required],
        descripcion: ['', Validators.required],
        imageUrl: ['', Validators.required],
        urlProyecto: ['']
      })
      this.id = this.aRoute.snapshot.paramMap.get('id');
}

  ngOnInit(): void {
    this.editar();
  }

  agregarEditarProyecto(){
    this.submitted = true;
    if(this.proyectos.invalid){
      return;
    }
    if(this.id === null){
      this.agregarProyecto();
    }else {
      this.editarProyecto(this.id);
    }

  }

  agregarProyecto(){
    const proyectos: any = {
      proyecto: this.proyectos.value.proyecto,
      descripcion: this.proyectos.value.descripcion,
      imageUrl: this.imagenes,
      urlProyecto: this.proyectos.value.urlProyecto,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._peticionesService.agregarProyecto(proyectos).then(() =>{
      this.toastr.success('Proyecto registrado con exito!', 'Proyecto registrado', {
        positionClass: 'toast-top-right'
      });
      this.loading = false;
      this.router.navigate(['/portfolio'], {fragment: 'PROYECTOS'})
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
  
  editarProyecto(id: string){
    const proyectos: any = {
      proyecto: this.proyectos.value.proyecto,
      descripcion: this.proyectos.value.descripcion,
      imageUrl: this.imagenes,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._peticionesService.updateProjects(id, proyectos).then(() =>{
      this.loading = false;
      this.toastr.info('El proyecto se actualizó con exito', 'Proyecto actualizado', {
        positionClass: 'toast-top-right'
      });
      this.router.navigate(['/portfolio'], {fragment: 'PROYECTOS'})
    });
  }
  editar(){
    if(this.id !== null){
    this.header = 'Editar proyecto'
    this.boton = 'Editar'
    this.loading = true;
    this._peticionesService.getProjects(this.id).subscribe(data =>{
            this.loading = false;
            this.proyectos.patchValue({
             proyecto: data.payload.data()['proyecto'],
             descripcion: data.payload.data()['descripcion'],
             imgUrl: data.payload.data(this.imagenes)['imageUrl'],
             urlProyecto: data.payload.data()['urlProyecto']
            })
          })
        }
     }
}
