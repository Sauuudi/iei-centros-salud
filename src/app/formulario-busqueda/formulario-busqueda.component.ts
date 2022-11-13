import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat, toLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import FullScreen from 'ol/control/FullScreen';
@Component({
  selector: 'app-formulario-busqueda',
  templateUrl: './formulario-busqueda.component.html',
  styleUrls: ['./formulario-busqueda.component.scss'],
})
export class FormularioBusquedaComponent implements OnInit {
  map?: Map;
  markerSource?: VectorSource;

  ngOnInit(): void {
    this.createMap();
    this.initializeListeners();
  }

  private createMap() {
    this.markerSource = new VectorSource();

    this.map = new Map({
      target: 'map',
      controls: [new FullScreen()],
      view: new View({
        center: fromLonLat([-0.375, 39.466667]), //valencia lon lat
        zoom: 13,
      }),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
        //layer de markers, para añair mas es al source
        new VectorLayer({
          source: this.markerSource,
          style: new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: 'assets/marker.png',
            }),
          }),
        }),
      ],
    });

    //marker de prueba, con Point
    let marker = new Feature(new Point(fromLonLat([-0.375, 39.466667])));
    // le ponemos la key hospital
    marker.set('hospital', 'nombre del hospital');
    //añadimos el marker
    this.markerSource.addFeature(marker);
  }

  private initializeListeners() {
    //listener de marcadores
    this.map?.on('click', (evt) => {
      let feature = this.map?.forEachFeatureAtPixel(
        evt.pixel,
        function (feat: any, layer: any) {
          return feat;
        }
      );

      if (feature && feature.get('geometry') instanceof Point) {
        let coordinate = evt.coordinate;
        let coordinatespointer = feature.get('geometry').flatCoordinates;
        console.log(
          'tenemos evento!!, coordenadas del evt: ',
          coordinate,
          '\n coordenadas convertidas a lon/lat --> ',
          toLonLat(coordinate),
          ' \n -------------------- \n tenemos el marcador!!!, name el hospital: ',
          feature.get('hospital'),
          '- (se pueden poner mas propiedades), \n coordenadas del marcador:',
          coordinatespointer,
          ' \n coordenadas convertidas a lon/lat -->',
          toLonLat(coordinatespointer),
          '\n mejor usar las del marcador'
        );
      }
    });
  }
}
