import { Injectable } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import { Feature, Overlay } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import FullScreen from 'ol/control/FullScreen';
import { Establecimiento } from '../shared/establecimiento.model';

const DEFAULT_CENTER_MAP = { LON: -0.375, LAT: 39.466667 };

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: Map;
  markerSource: VectorSource;
  popupOverlay: Overlay;
  popupElement: HTMLElement;

  initializeMap(target: HTMLElement, popupRef: HTMLElement) {
    this.popupElement = popupRef;
    this.markerSource = new VectorSource();
    this.popupOverlay = new Overlay({
      element: this.popupElement,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    })
    this.createMap(target);
    this.initializeMakerListener();
  }

  private createMap(target: HTMLElement) {
    this.map = new Map({
      target,
      controls: [new FullScreen()],
      view: new View({
        center: fromLonLat([DEFAULT_CENTER_MAP.LON, DEFAULT_CENTER_MAP.LAT]),
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
              src: 'assets/blue_marker.png',
            }),
          }),
        }),
      ],
      overlays: [this.popupOverlay],
    });
  }

  private initializeMakerListener() {
    this.map?.on('click', (evt) => {
      const feature = this.map?.forEachFeatureAtPixel(evt.pixel, function (feat: any, layer: any) {
          return feat;
        }
      );

      if (feature && feature.get('geometry') instanceof Point) {
        const coordinatesPointer = feature.get('geometry').flatCoordinates;
        const establecimientoPopupData = feature.get('establecimientoPopupData');        

        this.popupOverlay.setPosition(coordinatesPointer);

        this.popupElement.style.visibility = 'visible';
        document.getElementById('popup-title').innerHTML = establecimientoPopupData.nombre;
        document.getElementById('popup-message').innerHTML = establecimientoPopupData.descripcion
      } else {
        this.popupElement.style.visibility = 'hidden';
      }
    });
  }

  createMarker(lon: number, lat: number, establecimiento: Establecimiento) {
    const marker = new Feature(new Point(fromLonLat([lon, lat])));    
    marker.set('establecimientoPopupData', 
      {
        //pasarle mas info si queremos
        nombre: establecimiento.nombre,
        descripcion: establecimiento.descripcion
      }
    ); 
    this.markerSource.addFeature(marker);
  }

  clearMarkers() {
    this.markerSource.clear();
  }
}
