import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuessServiceService {

  constructor(
    private http:HttpClient
  ) { }

  // sendQuery(data:any): Observable<any> {
  //   return this.http.post<any>(
  //     "https://localhost"
  //   )
  // }
}
