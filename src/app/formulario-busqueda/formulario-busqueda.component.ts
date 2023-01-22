import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CentrosApiService } from '../services/centros-api.service';
import { MapService } from '../services/map.service';
@Component({
  selector: 'app-formulario-busqueda',
  templateUrl: './formulario-busqueda.component.html',
  styleUrls: ['./formulario-busqueda.component.scss'],
})
export class FormularioBusquedaComponent implements OnInit {
  searchForm: FormGroup;
  mapTarget: HTMLElement;
  popup: HTMLElement;
  establecimientos: any = [];
  resultadosString: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private map: MapService,
    private centrosService: CentrosApiService
  ) {}

  //Al iniciar el componente hemos de inicializar el mapa y el validador del form, tambien carga por defecto todos lo centros
  ngOnInit() {
    this.popup = document.getElementById('popup') as HTMLElement;
    this.mapTarget = document.getElementById('map') as HTMLElement;
    this.map.initializeMap(this.mapTarget, this.popup);
    this.createForm();
    this.getAllCentros();
  }  

  //En este método vamos a gestionar lo que haremos cuando pulsamos el botón de búsqueda.
  //Para ello, nos guardaremos los valores del form, creamos correctamente los filtros segun el form,
  // y llamamos a la api para cargar los centros segun los filtros
  onSearch() {
    const busqueda: { localidad; postalCode; provincia; tipo } = this.searchForm.value;
    this.map.clearMarkers();
    this.popup.style.visibility = 'hidden';
    this.resultadosString = [];
    const filters = this.buildSearchFilters(busqueda);
    this.getAllCentros(filters);
  }

  //Al pulsar el botón cancelar, volveremos al estado inicial de la página (tanto el form, como los resultados y marcadores)
  onCancel() {
    this.map.clearMarkers();
    this.resetFormValues();
    this.popup.style.visibility = 'hidden';
  }

  //Método para volver a los valores iniciales del form
  private resetFormValues() {
    this.searchForm.patchValue(
      {
        localidad: '',
        postalCode: '',
        provincia: 'Cualquiera',
        tipo: 'Cualquiera',
      }
    )
  }

  //Este método crea un form y obliga a, para poder buscar, que los datos introducidos sigan el siguiente formato
  private createForm() {
    this.searchForm = this.formBuilder.group({
      localidad: [''],
      postalCode: ['', Validators.pattern('[0-9]{5}')],
      provincia: ['Cualquiera'],
      tipo: ['Cualquiera'],
    });
  }
  
  // llama a  la api para cargar todos los centros si no se le pasa ningun filtro, o 
  // cargar solo los centros que cumplan con los filtros que le pasamos
  private getAllCentros(filters = {}) {
    this.centrosService.getAllCentros(filters).subscribe((centros: any) => {
      console.log(centros);
      if(!centros.data.length) {
        this.resultadosString.push('No hay datos que mostrar, intenta de cargar los datos a la base de datos');
      }
      centros.data.forEach((centro) => {
        this.map.createMarker(
          centro.longitud,
          centro.latitud,
          centro.nombre, 
          centro.tipo
        );
        this.resultadosString.push(this.getFormattedCenter(centro));
      });
    });
  }

  private getFormattedCenter(centro: any) {
    return `${centro.nombre}, ${centro.direccion} (${centro.localidad.nombre})`
  }

  private buildSearchFilters(filtros: { localidad; postalCode; provincia; tipo }) {
    const tipo =  filtros.tipo === 'Cualquiera' ? '' : filtros.tipo;
    const provincia =  filtros.provincia === 'Cualquiera' ? '' : filtros.provincia;
    return { 
      tipo: tipo,
      codigo_postal: filtros.postalCode,
      en_localidad: filtros.localidad,
      en_provincia: provincia,
    }
  }
}
