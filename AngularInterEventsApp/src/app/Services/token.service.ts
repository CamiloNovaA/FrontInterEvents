import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_NAME = 'FullName';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  signOut() {
    if (isPlatformBrowser(this.platformId))
      window.localStorage?.clear();
  }

  public saveToken(token: string) {
    if (isPlatformBrowser(this.platformId))
    {
      window.localStorage?.removeItem(TOKEN_KEY);
      window.localStorage?.setItem(TOKEN_KEY, token);
    }
  }

  public getToken(): string {
    if (isPlatformBrowser(this.platformId))
      return localStorage?.getItem(TOKEN_KEY) || '{}';
    
    return "";
  }

  public saveUser(idUser: string) {
    if (isPlatformBrowser(this.platformId))
    {
      window.localStorage?.removeItem(USER_KEY);
      window.localStorage?.setItem(USER_KEY, idUser);
    }
  }

  public getUser() {
    if (isPlatformBrowser(this.platformId))
    {
      return JSON.parse(localStorage?.getItem(USER_KEY) || '{}');
    }

    return "";
  }

  public getUserName() {
    if (isPlatformBrowser(this.platformId))
      return JSON.parse(localStorage?.getItem(USER_NAME) || '{}');
    
    return "";
  }

  public setUserName(userName: string) {
    if (isPlatformBrowser(this.platformId))
      window.localStorage?.setItem(USER_NAME, userName);
  }
}
