import { Component, OnInit } from '@angular/core';
import data from '../data/data.json'

@Component({
  selector: 'app-formulario-carga',
  templateUrl: './formulario-carga.component.html',
  styleUrls: ['./formulario-carga.component.scss']
})
export class FormularioCargaComponent implements OnInit {

  centros = data;


  constructor() { }

  ngOnInit(): void {
  }

}
