import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  appConfigUrl = 'assets/config.json';

  constructor(private http: HttpClient) { }

  getAppConfig(): Observable<any> {
    return this.http.get<any>(this.appConfigUrl);
  }
}
