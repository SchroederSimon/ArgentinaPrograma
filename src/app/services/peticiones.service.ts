import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  constructor(private firestore: AngularFirestore) { }

  agregarSkill(skill: any): Promise <any> {
    return this.firestore.collection('skills').add(skill)
  }

  getSkill(): Observable<any>{
    return this.firestore.collection('skills', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarSkill(id: string): Promise<any> {
    return this.firestore.collection('skills').doc(id).delete();
  }
//peticion para traer estos datos
  getHabilidad(id: string): Observable<any>{
    return this.firestore.collection('skills').doc(id).snapshotChanges()
  }

  updateSkill(id: string, data:any): Promise<any>{
    return this.firestore.collection('skills').doc(id).update(data);
  }


  // -----------------------------------------------------------------------------------------------------------
  // Peticiónes para la experiencia
  agregarExperiencia(experiencia: any): Promise <any> {
    return this.firestore.collection('experiencias').add(experiencia)
  }

  getExperiencia(): Observable<any>{
    return this.firestore.collection('experiencias', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarExperiencia(id: string): Promise<any> {
    return this.firestore.collection('experiencias').doc(id).delete();
  }


//peticion para traer estos datos
  getExperiencias(id: string): Observable<any>{
    return this.firestore.collection('experiencias').doc(id).snapshotChanges()
  }

  updateExperiencia(id: string, data:any): Promise<any>{
    return this.firestore.collection('experiencias').doc(id).update(data);
  }

  // -----------------------------------------------------------------------------------------------------------
  // Peticiónes para los proyectos
  agregarProyecto(experiencia: any): Promise <any> {
    return this.firestore.collection('proyectos').add(experiencia)
  }

  getProyecto(): Observable<any>{
    return this.firestore.collection('proyectos', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarProyecto(id: string): Promise<any> {
    return this.firestore.collection('proyectos').doc(id).delete();
  }


//peticion para traer estos datos
  getProjects(id: string): Observable<any>{
    return this.firestore.collection('proyectos').doc(id).snapshotChanges()
  }

  updateProjects(id: string, data:any): Promise<any>{
    return this.firestore.collection('proyectos').doc(id).update(data);
  }

}
