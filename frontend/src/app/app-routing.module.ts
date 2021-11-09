import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [
  
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'cadastro',
  component: CadastroComponent
},
{
  path: 'produtos',
  component: ProductListComponent
},
{
  path: 'produto/add',
  component: ProductAddComponent
},
{
  path: 'produto/edit',
  component: ProductEditComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
