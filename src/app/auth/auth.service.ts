import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBeM2XV39ALy6UPxb9pbkGO0GwS2G2hWwM',
      {
        email,
        password,
        returnSecureToken: true,
      }
    ).pipe(catchError(errorRes => {
      let errorMessage = 'An error ocure!🙁';
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email is already exists';
      }
      return throwError(errorMessage);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBeM2XV39ALy6UPxb9pbkGO0GwS2G2hWwM', {
      email,
      password,
      returnSecureToken: true,
    }
    );
  }
}