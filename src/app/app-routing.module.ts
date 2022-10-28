import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioBusquedaComponent } from './formulario-busqueda/formulario-busqueda.component';
import { FormularioCargaComponent } from './formulario-carga/formulario-carga.component';

const routes: Routes = [
  {
    path: 'busqueda',
    title: 'FORMULARIO BUUSQUEDA',
    component: FormularioBusquedaComponent,
  },
  {
    path: 'carga',
    title: 'FORMULARIO CARGA',
    component: FormularioCargaComponent,
  },
  { path: '', redirectTo: '/busqueda', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
