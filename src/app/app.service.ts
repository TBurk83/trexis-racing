import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  api = 'http://localhost:8000/api';
  username: string = '';

  constructor(private http: HttpClient) { }

  public getMembers() {
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }

  public getTeams() {
    return this.http
      .get(`${this.api}/teams`)
      .pipe(catchError(this.handleError));
  }

  public getMember(id: number) {
    return this.http
      .get(`${this.api}/members/${id}`)
      .pipe(catchError(this.handleError));
  }

  public updateMember(id: number, memberData: Object) {
    return this.http
      .put(`${this.api}/members/${id}`, memberData)
      .pipe(catchError(this.handleError));
  }

  public deleteMember(id: number) {
    return this.http
      .delete(`${this.api}/members/${id}`)
      .pipe(catchError(this.handleError));
  }

  public createMember(memberData: Object) {
    return this.http
      .post(`${this.api}/addMember`, memberData)
      .pipe(catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
