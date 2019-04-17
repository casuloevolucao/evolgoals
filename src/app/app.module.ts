//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { ReactiveFormsModule } from "@angular/forms";

//Services
import { HomeService } from './services/home.service';
import { LoginService } from './services/login.service';
import { AuthGuardService } from './services/authguard.service';

//ngx-bootstrap
import { CarouselModule } from 'ngx-bootstrap/carousel';

//Componet
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { TopomenuComponent } from './admin/topomenu/topomenu.component';
import { SidemenuComponent } from './admin/sidemenu/sidemenu.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { ResetComponent } from './acesso/reset/reset.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    TopomenuComponent,
    SidemenuComponent,
    LoginComponent,
    CadastroComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    CarouselModule.forRoot()
  ],
  providers: [
    HomeService,
    LoginService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
