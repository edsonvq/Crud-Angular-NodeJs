import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login( email, senha) {
    const obj = {
      email,
      senha
    };

    //console.log(obj);

    return this.http.post(`${this.uri}/cliente/login`, obj);
    //.subscribe(res => console.log(res));
  }
  cadastro(nome, data, email, senha) {
    const obj = {
      nome,
      data,
      email,
      senha
    };

    console.log(obj);

    this.http.post(`${this.uri}/cliente/insert`, obj)
        .subscribe(res => console.log(res));
  }
  

  getUsers() {
    return this
           .http
           .get(`${this.uri}/clientes`);
  }

  getUser(id) {
    return this
            .http
            .get(`${this.uri}/clientes/${id}`);
  }

  updateUser(id, Nome, Data, Login, Senha) {
    const obj = {
      Nome,
      Data,
      Login,
      Senha
    };
    
    console.log(obj);
    this
      .http
      .post(`${this.uri}/clientes/${id}`, obj)
      .subscribe(res => console.log('Update Complete'));
  }

  deleteUser(id) {
    return this
              .http
              .get(`${this.uri}/clientes/${id}/delete`);
  }
}
