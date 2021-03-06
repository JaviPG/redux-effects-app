import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get<Usuario[]>(`${this.url}/users?per_page=6&delay=3`)
      .pipe(map((res: any) => res['data']));
  }

  getUserByid(id: string) {
    return this.http
      .get<Usuario[]>(`${this.url}/users/${id}`)
      .pipe(map((res: any) => res['data']));
  }
}
