import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuessService {

  constructor(
    private http:HttpClient
  ) { }

  sendQuery(): Observable<any> {
    // Note, for my setup, I need https.  For XAMPP,
    // you will likely need http instead.
    return this.http.post<any>(
      //"http://localhost/hw8/wordle_api.php",
      "https://cs4640.cs.virginia.edu/kck3due/hw8/wordle_api.php",
      null
    )
  }
}
