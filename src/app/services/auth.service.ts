import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

export interface AccountUser {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface AuthSession {
  access_token: string;
  token_type: string;
  user: AccountUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData extends LoginCredentials {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://127.0.0.1:8000/auth';
  private readonly tokenKey = 'unialre_access_token';
  private readonly userKey = 'unialre_account';
  readonly user = signal<AccountUser | null>(this.readUser());

  constructor(private http: HttpClient) {}

  get token(): string | null {
    return typeof sessionStorage === 'undefined' ? null : sessionStorage.getItem(this.tokenKey);
  }

  login(credentials: LoginCredentials): Observable<AuthSession> {
    return this.http.post<AuthSession>(this.apiUrl + '/login', credentials)
      .pipe(tap((session) => this.saveSession(session)));
  }

  register(data: RegistrationData): Observable<AuthSession> {
    return this.http.post<AuthSession>(this.apiUrl + '/register', data)
      .pipe(tap((session) => this.saveSession(session)));
  }

  refreshProfile(): Observable<AccountUser | null> {
    if (!this.token) return of(null);

    return this.http.get<AccountUser>(this.apiUrl + '/me').pipe(
      tap((user) => {
        this.user.set(user);
        sessionStorage.setItem(this.userKey, JSON.stringify(user));
      }),
      catchError(() => {
        this.logout();
        return of(null);
      })
    );
  }

  logout(): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(this.tokenKey);
      sessionStorage.removeItem(this.userKey);
    }
    this.user.set(null);
  }

  private saveSession(session: AuthSession): void {
    sessionStorage.setItem(this.tokenKey, session.access_token);
    sessionStorage.setItem(this.userKey, JSON.stringify(session.user));
    this.user.set(session.user);
  }

  private readUser(): AccountUser | null {
    if (typeof sessionStorage === 'undefined') return null;
    const stored = sessionStorage.getItem(this.userKey);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as AccountUser;
    } catch {
      sessionStorage.removeItem(this.userKey);
      return null;
    }
  }
}
