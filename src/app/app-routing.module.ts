import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './components/agregar-skill/agregar.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { AgregarExperienciaComponent } from './components/agregar-experiencia/agregar-experiencia.component';
import { AgregarProyectoComponent } from './components/agregar-proyecto/agregar-proyecto.component';
import { AuthGuardGuard  } from "../app/services/auth-guard.guard";

const routes: Routes = [

  { path: 'portfolio', component: PortfolioComponent},
  { path: 'agregarSkill', component: AgregarComponent, canActivate: [AuthGuardGuard] },
  { path: 'editSkill/:id', component: AgregarComponent, canActivate: [AuthGuardGuard]},
  { path: 'agregarExperiencia', component: AgregarExperienciaComponent, canActivate: [AuthGuardGuard]},
  { path: 'editExperiencia/:id', component: AgregarExperienciaComponent, canActivate: [AuthGuardGuard]},
  { path: 'agregarProyecto', component: AgregarProyectoComponent, canActivate: [AuthGuardGuard]},
  { path: 'editarProyecto/:id', component: AgregarProyectoComponent, canActivate: [AuthGuardGuard]},
  { path: 'login', component: IniciarSesionComponent},
  { path: '', redirectTo: '/portfolio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
