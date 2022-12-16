import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormularioCargaComponent } from '../formulario-carga/formulario-carga.component';
import { MapService } from '../services/map.service';
@Component({
  selector: 'app-formulario-busqueda',
  templateUrl: './formulario-busqueda.component.html',
  styleUrls: ['./formulario-busqueda.component.scss'],
})
export class FormularioBusquedaComponent implements OnInit {
  searchForm!: FormGroup;
  mapTarget: HTMLElement;
  popup: HTMLElement;
  resultados = '';

  constructor(
    private fb: FormBuilder,
    private map: MapService,
    private centros: FormularioCargaComponent
  ) {}

  ngOnInit() {
    this.popup = document.getElementById('popup') as HTMLElement;
    this.mapTarget = document.getElementById('map') as HTMLElement;
    this.map.initializeMap(this.mapTarget, this.popup);
    this.checkForm();
  }

  checkForm() {
    this.searchForm = this.fb.group({
      city: [''],
      postal: ['', Validators.pattern('[0-9]{5}')],
      provincia: ['Cualquiera'],
      type: ['Cualquiera'],
    });
  }

  onSearch() {
    this.onCancel();
    const busqueda: { city; postal; provincia; type } = this.searchForm.value;
    // console.log(busqueda);
    this.resultados += `Resultado de la búsqueda para tipo: ${busqueda.type}, ciudad: ${busqueda.city}, CP: ${busqueda.postal}, provincia: ${busqueda.provincia}\n`;

    let est = this.centros.centros;
    if (busqueda.type != 'Cualquiera') {
      est = est.filter((el) => {
        el.tipo.toLowerCase() !== busqueda.type.toLowerCase();
      });
    }
    if (busqueda.city != '') {
      est = est.filter((el) => {
        el.localidad.toLowerCase() !== busqueda.city.toLowerCase();
      });
    }
    if (busqueda.postal != '') {
      est = est.filter((el) => {
        el.cod_postal.toLowerCase() !== busqueda.postal.toLowerCase();
      });
    }
    if (busqueda.provincia != 'Cualquiera') {
      est = est.filter((el) => {
        el.provincia.toLowerCase() !== busqueda.provincia.toLowerCase();
      });
    }
    //Añadir petición de búsqueda
    //depues de la pet mostrar los centros en resultados y en el mapa con marcadores
    est.forEach((el) => {
      this.map.createMarker(
        <number>(<unknown>el.longitud),
        <number>(<unknown>el.latitud),
        el.tipo,
        el.nombre
      );
      this.resultados += `${el.nombre}, ${el.cod_postal}, ${el.descripcion}, ${el.direccion}, ${el.telefono}, ${el.tipo}\n`;
    });
    //new Centro(), add al array que mostraremoe en el ngFor del html en resultados
  }

  onCancel() {
    this.map.clearMarkers();
    this.resultados = '';
  }
}
