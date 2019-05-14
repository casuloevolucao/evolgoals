//Cinfugrações
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componets
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/authguard.service';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { ResetComponent } from './acesso/reset/reset.component';
import { HomeadminComponent } from './admin/views/homeadmin/homeadmin.component';
import { EditaradminComponent } from './admin/views/editaradmin/editaradmin.component';
import { ListaComponent } from './lista/lista.component';
import { TesteComponent } from './teste/teste.component';

const routes: Routes = [
  {path: "", component: TesteComponent},
  {path: "login", component: LoginComponent},
  {path: "cadastro", component: CadastroComponent},
  {path: "resetsenha", component: ResetComponent},
  {path: "admin", component: AdminComponent, canActivate:[AuthGuardService], children: [
    {path: "", component:HomeadminComponent},
    {path: "perfil", component:EditaradminComponent}
  ]},
  {path:"lista", component:ListaComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
