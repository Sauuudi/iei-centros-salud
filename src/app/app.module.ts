import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioCargaComponent } from './formulario-carga/formulario-carga.component';
import { FormularioBusquedaComponent } from './formulario-busqueda/formulario-busqueda.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioCargaComponent,
    FormularioBusquedaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
