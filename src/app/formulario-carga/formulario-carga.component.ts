import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import data from 'src/assets/data.json'

@Component({
  selector: 'app-formulario-carga',
  templateUrl: './formulario-carga.component.html',
  styleUrls: ['./formulario-carga.component.scss']
})
export class FormularioCargaComponent {

  centros = data;

  constructor(
    private http: HttpClient
  ) { }


 

}
