import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import data from 'src/assets/data.json';

@Component({
  selector: 'app-formulario-carga',
  templateUrl: './formulario-carga.component.html',
  styleUrls: ['./formulario-carga.component.scss'],
})
export class FormularioCargaComponent {
  centros = data;
  resultados = []

  onSearch(){
    const all = document.querySelector('#all') as HTMLInputElement
    const baleares = document.querySelector('#baleares') as HTMLInputElement
    const valencia = document.querySelector('#valencia') as HTMLInputElement
    const euskadi = document.querySelector('#euskadi') as HTMLInputElement
    console.log(euskadi.checked)

    //Añadir consultas a la API dependiendo de si las constantes de arriba estan checked o no

    //Cambiar el texto del recuadro dependiendo de los resultados de estas peticiones
    this.resultados.push('Error 1')
  }

  onCancel(){
    this.resultados = []
  }

  onClear(){

  }

  constructor(private http: HttpClient) {}
}
