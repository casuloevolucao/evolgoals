//Cinfugrações
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componets

import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/authguard.service';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "admin", component: AdminComponent, canActivate:[AuthGuardService], children: [
    
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
