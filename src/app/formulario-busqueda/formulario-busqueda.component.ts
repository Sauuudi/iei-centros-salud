import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormularioCargaComponent } from '../formulario-carga/formulario-carga.component';
import { MapService } from '../services/map.service';
import { Establecimiento } from '../shared/establecimiento.model';
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
  resultados: Establecimiento[];

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
    //y poner el mapa con el zoom en toda españa
    this.filterCentros(this.establecimientos, busqueda).forEach((filteredCentro: Establecimiento) => {
      this.map.createMarker(
        <number>(<unknown>filteredCentro.longitud),
        <number>(<unknown>filteredCentro.latitud),
        filteredCentro
      );
      this.resultados.push(filteredCentro)
    });
  }

  onCancel() {
    this.map.clearMarkers();
    this.resultados = [];
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

  private filterCentros(centros: Establecimiento[], busqueda) {
    
    return centros.filter((centro) => {      
      return (busqueda.provincia == 'Cualquiera' || centro.provincia.toLowerCase().includes(busqueda.provincia.toLowerCase())) &&
      (busqueda.type == 'Cualquiera' || centro.tipo.toLowerCase() == busqueda.type.toLowerCase()) && 
      (busqueda.postalCode == '' || centro.cod_postal == busqueda.postalCode) && 
      (busqueda.city == '' || centro.localidad.toLowerCase().includes(busqueda.city.toLowerCase()));
    });
  }
}
