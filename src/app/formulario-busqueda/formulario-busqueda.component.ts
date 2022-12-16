import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { FormularioCargaComponent } from '../formulario-carga/formulario-carga.component';
import { MapService } from '../services/map.service';
import { Establecimiento } from '../shared/centro-model.model';
@Component({
  selector: 'app-formulario-busqueda',
  templateUrl: './formulario-busqueda.component.html',
  styleUrls: ['./formulario-busqueda.component.scss'],
})
export class FormularioBusquedaComponent implements OnInit {
  searchForm: FormGroup;
  mapTarget: HTMLElement;
  popup: HTMLElement;
  resultados: string[]; //debe ser Establecimientos[]

  constructor(
    private formBuilder: FormBuilder,
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
    this.searchForm = this.formBuilder.group({
      city: [''],
      postalCode: ['', Validators.pattern('[0-9]{5}')],
      provincia: ['Cualquiera'],
      type: ['Cualquiera'],
    });
  }

  onSearch() {
    this.onCancel();
    const busqueda: { city; postalCode; provincia; type } = this.searchForm.value;
    console.log(busqueda);
    // this.resultados += `Resultado de la búsqueda para -->
    //  tipo: ${busqueda.type},
    //  ciudad: ${busqueda.city},
    //  CP: ${busqueda.postalCode},
    //  provincia: ${busqueda.provincia}\n`;
     
     const centros = this.centros.centros;
    
    //Añadir petición de búsqueda
    //depues de la pet mostrar los centros en resultados y en el mapa con marcadores
    this.filterCentros(centros, busqueda).forEach((res) => {
      this.map.createMarker(
        <number>(<unknown>res.longitud),
        <number>(<unknown>res.latitud),
        res.tipo,
        res.nombre
      );
      //new Centro(), add al array que mostraremoe en el ngFor del html en resultados
      this.resultados.push(
        `${res.nombre}, ${res.cod_postal}, ${res.localidad}, ${res.descripcion}, ${res.direccion}, ${res.telefono}, ${res.tipo}\n`
      )
    });
  }

  onCancel() {
    this.map.clearMarkers();
    this.resultados = [''];
    this.searchForm.patchValue(
      {
        city: '',
        postalCode: '',
        provincia: 'Cualquiera',
        type: 'Cualquiera',
      }
    );
    
  }

  private filterCentros(centros, busqueda) {
    return centros.filter((centro) => {      
      return (busqueda.provincia == 'Cualquiera' || centro.provincia.includes(busqueda.provincia)) &&
      (busqueda.type == 'Cualquiera' || centro.tipo == busqueda.type) && 
      (busqueda.postalCode == '' || centro.cod_postal == busqueda.postalCode) && 
      (busqueda.city == '' || centro.localidad.includes(busqueda.city.toLowerCase()));
    });
  }
}
