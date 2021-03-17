import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  protected apiPath = 'https://geotech-gps.com:9090/api/';
  // protected apiPath = 'https://smartrack-geotech.com:9090/api/';
  // protected apiPath = 'http://localhost:9090/api/';

  private httpOption = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };
  // protected apiPath: string = 'http://localhost:9090/api/';

  constructor(private http: HttpClient) { }

  getFnc() {
    return this.http.get(this.apiPath, this.httpOption).pipe(
      // "catchError" instead "catch"
      catchError(this.handelErrors)
    );
  }

  postFnc(apiPath: string, body) {
    return this.http.post(apiPath, body, this.httpOption).pipe(
      // "catchError" instead "catch"
      catchError(this.handelErrors)
    );
  }

  putFnc(apiPath: string, item) {
    return this.http.put(apiPath, item, this.httpOption).pipe(
      // "catchError" instead "catch"
      catchError(this.handelErrors)
    );
  }

  deleteFnc(apiPath: string, itemID: any) {
    return this.http.delete(apiPath + itemID, this.httpOption).pipe(
      // "catchError" instead "catch"
      catchError(this.handelErrors)
    );
  }

  handelErrors(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `${error.error.message}`;
    }
    console.log(error.status === 404); // in not found case will print true
    console.log(errorMessage); // for example message will be "le compte n'est pas trouvé"
    return throwError(errorMessage);
  }
}


