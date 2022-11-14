import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MapService } from '../services/map.service';
@Component({
  selector: 'app-formulario-busqueda',
  templateUrl: './formulario-busqueda.component.html',
  styleUrls: ['./formulario-busqueda.component.scss'],
})
export class FormularioBusquedaComponent implements OnInit {
  searchForm!: FormGroup;
  mapTarget?: HTMLElement;
  resultados = '';

  constructor(private fb: FormBuilder, private map: MapService) {}

  ngOnInit() {
    this.mapTarget = document.getElementById('map') as HTMLElement;
    this.map.initializeMap(this.mapTarget);
    this.checkForm();
  }

  checkForm() {
    this.searchForm = this.fb.group({
      city: [''],
      postal: ['', Validators.pattern('[0-9]{5}')],
      prov: ['Cualquiera'],
      type: ['Cualquiera'],
    });
  }

  onSearch() {
    this.onCancel();
    const { city, postal, prov, type } = this.searchForm.value;
    //Añadir petición de búsqueda

    //depues de la pet mostrar los centros en resultados y en el mapa con marcadores
    this.map.createMarker(-0.375, 39.466667, 'hospital', 'hospital del centro');
    this.resultados = 'los resultados \n';
  }

  onCancel() {
    this.map.clearMarkers();
    this.resultados = '';
  }
}
