import { Injectable } from '@angular/core';
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

const centerMap = { lon: -0.375, lat: 39.466667 };

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map?: Map;
  markerSource: VectorSource = new VectorSource();

  initializeMap(target: HTMLElement) {
    this.createMap(target);
    this.initializeMakerListener();
  }

  private createMap(target: HTMLElement) {
    this.map = new Map({
      target,
      controls: [new FullScreen()],
      view: new View({
        center: fromLonLat([centerMap.lon, centerMap.lat]),
        zoom: 13,
      }),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
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
  }

  private initializeMakerListener() {
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
          '-- tenemos el marcador!!!, name del hospital: ' +
            feature.get('hospital') +
            '\n coordenadas del marcador:' +
            toLonLat(coordinatespointer) +
            '\n mejor usar las del marcador \n'
        );
      }
    });
  }

  createMarker(lon: number, lat: number, key: string, value: string) {
    let marker = new Feature(new Point(fromLonLat([lon, lat])));
    marker.set(key, value);
    this.markerSource.addFeature(marker);
  }

  clearMarkers(){
    this.markerSource.clear();
  }
}
