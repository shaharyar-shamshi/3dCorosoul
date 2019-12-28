import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }
  getImage(): any {
    let params = new HttpParams();
    params = params.append("count", "7");
    params = params.append("client_id", `${environment.client_id}`);
    console.log(params);
    const url = `${environment.url}/random`;
    return this.http.get(url, {params: params});
  }
}
