import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = "http://localhost:3000/api";

  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post(`${this.api}/register`, user);
  }

  login(user: any) {
    return this.http.post(`${this.api}/login`, user);
  }

  getUser(id: string) {
    return this.http.get(`${this.api}/user/${id}`);
  }

  updateUser(id: string, data: any) {
    return this.http.put(`${this.api}/user/${id}`, data);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.api}/user/${id}`);
  }
}