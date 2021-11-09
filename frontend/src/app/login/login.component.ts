import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { User } from './service/user';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private usuario: User = new User();

  formularioLogin: FormGroup;
  
  constructor(private authService : AuthService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.formularioLogin = this.fb.group({
      email: ['', Validators.required ],
      senha: ['', Validators.required ],
    });
  }

  ngOnInit() {
  }


  onClickLogin() {
    this.usuario.email =  this.formularioLogin.value.email;
    this.usuario.senha =  this.formularioLogin.value.senha;

    this.authService.login(this.usuario.email, this.usuario.senha).subscribe(res => console.log(res));

 }
}
