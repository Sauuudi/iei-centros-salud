import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentrosApiService {

  constructor(private http: HttpClient) { }
  
  getAllCentros(filter = {}) {
    return new Observable ( observer => {
      fetch(
        'http://localhost:8080/getAllCenters',
        {
          method: "POST",
          body: JSON.stringify(filter),
          mode: "cors",
          headers:
          {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      ).then(res => {
        return res.json();
      })
      .then(body => {
        observer.next(body);
        observer.complete();
      })
    })
  }

  cargaValenciaCenters() {
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    return this.http.get('http://localhost:8080/cargaComunidadValenciana', {headers, observe: 'response'});
  }

  cargaEuskadiCenters() {
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    return this.http.get('http://localhost:8080/cargaEuskadi', {headers, observe: 'response'});
  }

  cargaBalearesCenters() {
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    return this.http.get('http://localhost:8080/cargaIslasBaleares', {headers, observe: 'response'});
  }
}
