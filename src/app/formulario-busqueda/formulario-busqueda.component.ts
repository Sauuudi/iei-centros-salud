import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
  establecimientos: any;
  resultados: string[]; //debe ser Establecimientos[]

  constructor(
    private formBuilder: FormBuilder,
    private map: MapService,
    private formularioCarga: FormularioCargaComponent
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
    const busqueda: { city; postalCode; provincia; type } = this.searchForm.value;
    this.map.clearMarkers();
    this.resultados = [];

    console.log(busqueda);

    this.establecimientos = this.formularioCarga.centros
    // this.centros.getCentros().subscribe((res) => {
    //   console.log("----------" ,res);
      
    //   this.establecimientos = res;
    // });
    
    //Añadir petición de búsqueda
    //depues de la pet mostrar los centros en resultados y en el mapa con marcadores
    this.filterCentros(this.establecimientos, busqueda).forEach((res) => {
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
    this.resetFormValues();
  }

  private resetFormValues() {
    this.searchForm.patchValue(
      {
        city: '',
        postalCode: '',
        provincia: 'Cualquiera',
        type: 'Cualquiera',
      }
    )
  }

  private filterCentros(centros, busqueda) {
    
    return centros.filter((centro) => {      
      return (busqueda.provincia == 'Cualquiera' || centro.provincia.toLowerCase().includes(busqueda.provincia.toLowerCase())) &&
      (busqueda.type == 'Cualquiera' || centro.tipo.toLowerCase() == busqueda.type.toLowerCase()) && 
      (busqueda.postalCode == '' || centro.cod_postal == busqueda.postalCode) && 
      (busqueda.city == '' || centro.localidad.toLowerCase().includes(busqueda.city.toLowerCase()));
    });
  }
}
