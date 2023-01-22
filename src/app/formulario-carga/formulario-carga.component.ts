import { Component, ElementRef, ViewChild } from '@angular/core';
import { CentrosApiService } from '../services/centros-api.service';
@Component({
  selector: 'app-formulario-carga',
  templateUrl: './formulario-carga.component.html',
  styleUrls: ['./formulario-carga.component.scss'],
})
export class FormularioCargaComponent{
  resultadosV = '';
  resultadosB = '';
  resultadosE = '';
  resultadoDelete = '';

  @ViewChild('baleares') balearesCheckBox: ElementRef;
  @ViewChild('valencia') valenciaCheckBox: ElementRef;
  @ViewChild('euskadi') euskadiCheckBox: ElementRef;

  constructor(private centrosServices: CentrosApiService) {}

  onSearch() {
    //Añadir consultas a la API dependiendo de si las constantes de arriba estan checked o no
    this.resultadosV = 'Cargando datos de la Comunidad Valenciana, espere un momento...';
    this.resultadosB = 'Cargando datos de las Islas Baleares, espere un momento...';
    this.resultadosE = 'Cargando datos de Euskadi, espere un momento...';
    this.resultadoDelete = '';

    this.getSomeCenters({
      valencia: this.valenciaCheckBox.nativeElement.checked,
      baleares: this.balearesCheckBox.nativeElement.checked,
      euskadi: this.euskadiCheckBox.nativeElement.checked
    })
  }

  //Con este método, borramos los datos almacenados en el warehouse
  onClear(){
    this.centrosServices.deleteCentrosFromDB().subscribe( res => res , err => {       
      if (err.status == 200) {
        this.resultadoDelete = 'Centros Borrados de la BBDD'
      } else {
        this.resultadoDelete = 'Error en el borrado de datos de la BBDD'
      }
    })
  }

  private async getSomeCenters(comunidades: {valencia: boolean, baleares: boolean, euskadi: boolean}) {
    if( comunidades.valencia ) { this.centrosServices.cargaValenciaCenters().subscribe( res => res , err => { 
      if (err.status == 200) {
        this.resultadosV = 'Datos de la Comunidad Valenciana cargados correctamente';
      } else {
        this.resultadosV = 'Error en la carga de datos de la Comunidad Valenciana'
      }
    })} else {
      this.resultadosV = '';
    }

    if( comunidades.baleares ) { this.centrosServices.cargaBalearesCenters().subscribe( res => res , err => { 
      if (err.status == 200) {
        this.resultadosB = 'Datos de las Islas Baleares cargados correctamente';
      }
      else {this.resultadosB = 'Error en la carga de datos de las Islas Baleares';}
    })} else {
      this.resultadosB = '';
    }

    if( comunidades.euskadi ) {this.centrosServices.cargaEuskadiCenters().subscribe( res => res , err => { 
      if (err.status == 200) {
        this.resultadosE = 'Datos de Euskadi cargados correctamente';
      }
      else {
        this.resultadosE = 'Error en la carga de datos de Euskadi';
      }
    })} else {
      this.resultadosE = '';
    }
  }
}