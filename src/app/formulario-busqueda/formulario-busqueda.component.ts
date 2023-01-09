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

  //Al iniciar el componente hemos de inicializar el mapa y el validador del form
  ngOnInit() {
    this.popup = document.getElementById('popup') as HTMLElement;
    this.mapTarget = document.getElementById('map') as HTMLElement;
    this.map.initializeMap(this.mapTarget, this.popup);
    this.initialMarkers()
    this.checkForm();
  }

  //Este método obliga a, para poder buscar, que los datos introducidos sigan el siguiente formato
  checkForm() {
    this.searchForm = this.formBuilder.group({
      city: [''],
      postalCode: ['', Validators.pattern('[0-9]{5}')],
      provincia: ['Cualquiera'],
      type: ['Cualquiera'],
    });
  }

  //Cargamos los marcadores que deben estar al inicio (es decir, todos)
  initialMarkers(){
    //Lo hemos de cambiar por una petición que nos los devuelva todos
    this.establecimientos = this.formularioCarga.centros

    this.establecimientos.forEach((filteredCentro: Establecimiento) => {
      this.map.createMarker(
        <number>(<unknown>filteredCentro.longitud),
        <number>(<unknown>filteredCentro.latitud),
        filteredCentro
      );
    })
  }

  //En este método vamos a gestionar lo que haremos cuando pulsamos el botón de búsqueda.
  //Para ello, nos guardaremos los valores del form, haremos peticiones a la api y, una vez tengamos la lista filtrada,
  //crearemos un marcador para cada uno de los establecimientos resultado y pushearemos los datos obtenidos al cuadro de texto
  onSearch() {
    const busqueda: { city; postalCode; provincia; type } = this.searchForm.value;
    this.map.clearMarkers();
    this.resultados = [];

    this.establecimientos = this.formularioCarga.centros

    //En este bucle lo que vamos a hacer es recorrer el objeto búsqueda (con los valores del form) y realizar una petición a la API
    //para aquellos valores del form que sean distintos a los por defecto, para así poder filtrar los resultados
    Object.entries(busqueda).forEach(entry => {
      const [key, value] = entry;
      if(value !== '' && value !== 'Cualquiera'){
        //Hacer aquí la petición de búsqueda
      }
    });

    // this.centros.getCentros().subscribe((res) => {
    //   console.log("----------" ,res);
      
    //   this.establecimientos = res;
    // });
    



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

  //Al pulsar el botón cancelar, volveremos al estado inicial de la página (tanto el form, como los resultados y marcadores)
  onCancel() {
    this.map.clearMarkers();
    this.initialMarkers()
    this.resultados = [];
    this.resetFormValues();
  }

  //Método para volver a los valores iniciales del form
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
      return ((busqueda.provincia == 'Cualquiera' || centro.provincia.toLowerCase().includes(busqueda.provincia.toLowerCase())) &&
      (busqueda.postalCode == '' || centro.cod_postal == busqueda.postalCode) &&
      (busqueda.city == '' || centro.localidad.toLowerCase().includes(busqueda.city.toLowerCase()))) &&
      (busqueda.type == 'Cualquiera' || centro.tipo.toLowerCase() == busqueda.type.toLowerCase()) ;
    });
  }
}
