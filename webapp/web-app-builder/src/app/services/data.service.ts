import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataMap } from '../data/data-map';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {
  }

  // GET data --REST
  getData(url: string): Observable<DataMap<any>[]> {
    return this.http.get<DataMap<any>[]>(url);
  }

  // GET data with id --REST
  getDataWithId(url: string): Observable<DataMap<any>> {
    return this.http.get<DataMap<any>>(url);
  }

  //INSERT data --REST
  insertData(url: string, data: any): Observable<DataMap<any>> {
    return this.http.post<DataMap<any>>(url, data, httpOptions);
  }

  //UPDATE data --REST
  update(url: string, data: any): Observable<HttpResponse<any>> {
    return this.http.put(url, data, { ...httpOptions, observe: 'response' });
  }

  //DELETE data --REST
  delete(url: string): Observable<HttpResponse<any>> {
    return this.http.delete(url, { ...httpOptions, observe: 'response' });
  }

}
