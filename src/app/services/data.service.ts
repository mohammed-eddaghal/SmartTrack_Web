import { InvalidInfo } from './../commen/invalid-info';
import { InvalidInput } from './../commen/invalid-input';
import { NotFoundError } from './../commen/not-found-error';
import { AppError } from './../commen/app-error';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class DataService {

  protected apiPath: string = 'http://localhost:9090/api/';

  constructor(private http: HttpClient) { }

  getFnc() {
    return this.http.get(this.apiPath).pipe(
      // eg. "map" without a dot before
      retry(1),
      // "catchError" instead "catch"
      catchError(this.handelErrors)
    );
  }

  postFnc(apiPath : string, body) {
      return this.http.post(apiPath, body).pipe(
        // eg. "map" without a dot before
        retry(1),
        // "catchError" instead "catch"
        catchError(this.handelErrors)
      );
  }

  putFnc(apiPath : string, item) {
    return this.http.put(apiPath + item.id, item).pipe(
      // eg. "map" without a dot before
      retry(1),
      // "catchError" instead "catch"
      catchError(this.handelErrors)
    );
  }

  deleteFnc(apiPath : string, itemID: number) {
    return this.http.delete(apiPath + itemID).pipe(
      // eg. "map" without a dot before
      retry(1),
      // "catchError" instead "catch"
      catchError(this.handelErrors)
    );
  }

  handelErrors(error:Response){
    if (error.status === 404) {
      console.log("1)" + error.statusText)
      return throwError(new NotFoundError);
    }
    else if(error.status === 400){
      console.log("2)" + error.statusText)
      return throwError(new InvalidInput);
    }else if(error.status === 500){
      console.log("4)" + JSON.stringify(error))
      alert("error de seveur")
      return throwError(new InvalidInfo);
    }

    console.log("3)" + error.statusText)
    return throwError(new AppError);
  }
}


