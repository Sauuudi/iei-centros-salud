import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioCargaComponent } from './formulario-carga/formulario-carga.component';
import { FormularioBusquedaComponent } from './formulario-busqueda/formulario-busqueda.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FormularioCargaComponent,
    FormularioBusquedaComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [FormularioCargaComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
