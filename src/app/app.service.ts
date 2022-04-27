import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  api = 'http://localhost:8000/api';
  username: string = '';

  constructor(private http: HttpClient) {}

  public getMembers() {
    return this.http.get(`${this.api}/members`).pipe(catchError(this.handleError));
  }

  public getTeams() {
    return this.http.get(`${this.api}/teams`).pipe(catchError(this.handleError));
  }

  public getUsers() {
    return this.http.get(`${this.api}/users`).pipe(catchError(this.handleError));
  }

  public getMember(id: number) {
    return this.http.get(`${this.api}/members/${id}`).pipe(catchError(this.handleError));
  }

  public updateMember(id: number, memberData: Object) {
    return this.http
      .put(`${this.api}/members/${id}`, memberData)
      .pipe(catchError(this.handleError));
  }

  public deleteMember(id: number) {
    return this.http.delete(`${this.api}/members/${id}`).pipe(catchError(this.handleError));
  }

  public createMember(memberData: Object) {
    return this.http.post(`${this.api}/addMember`, memberData).pipe(catchError(this.handleError));
  }

  public setUsername(name: string): void {
    this.username = name;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return [];
  }
}

export const MockMembers = [
  {
    id: 3,
    firstName: 'Jeb',
    lastName: 'Jackson',
    jobTitle: 'Reserve Driver',
    team: 'Formula 2 - Car 54',
    status: 'Active',
  },
  {
    firstName: 'adwawd',
    lastName: 'awdawd',
    team: 'World Endurance Championship - Car 5',
    jobTitle: 'wadawd',
    status: 'Active',
    id: 7,
  },
  {
    firstName: 'bebo',
    lastName: 'collins',
    jobTitle: 'beep',
    status: 'Inactive',
    team: 'Formula 2 - Car 63',
    id: 8,
  },
  {
    firstName: 'awdawd',
    lastName: 'adawd',
    jobTitle: 'awdawda',
    status: 'Active',
    team: 'World Endurance Championship - Car 5',
    id: 9,
  },
];

export const MockMember = {
  id: 3,
  firstName: 'Jeb',
  lastName: 'Jackson',
  jobTitle: 'Reserve Driver',
  team: 'Formula 2 - Car 54',
  status: 'Active',
};

export const MockTeams = [
  {
    id: 1,
    teamNameName: 'Formula 1 - Car 77',
  },
  {
    id: 2,
    teamName: 'Formula 1 - Car 8',
  },
  {
    id: 3,
    teamName: 'Formula 2 - Car 54',
  },
  {
    id: 4,
    teamName: 'Formula 2 - Car 63',
  },
  {
    id: 5,
    teamName: 'Deutsche Tourenwagen Masters - Car 117',
  },
  {
    id: 6,
    teamName: 'Deutsche Tourenwagen Masters - Car 118',
  },
  {
    id: 7,
    teamName: 'World Endurance Championship - Car 99',
  },
  {
    id: 8,
    teamName: 'World Endurance Championship - Car 5',
  },
  {
    id: 9,
    teamName: 'World Rally Championship - Car 77',
  },
  {
    id: 10,
    teamName: 'World Rally Championship - Car 90',
  },
];

export const MockUsers = [
  {
    id: 1,
    name: 'trevor',
    username: 'tburk83@pm.me',
    password: 'pass',
  },
  {
    id: 2,
    name: 'voltron',
    username: 'voltron@email.com',
    password: 'lion',
  },
];
