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
import {NgxMaskModule} from 'ngx-mask'

//Services
import { HomeService } from './services/home.service';
import { LoginService } from './services/login.service';
import { AuthGuardService } from './services/authguard.service';
import { RespostaService } from './services/resposta.service';

//ngx-bootstrap
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

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
import { HomeadminComponent } from './admin/views/homeadmin/homeadmin.component';
import { EditaradminComponent } from './admin/views/editaradmin/editaradmin.component';
import { ListaComponent } from './lista/lista.component';
import { TabperfilComponent } from './admin/views/homeadmin/tabperfil/tabperfil.component';
import { TabgostaComponent } from './admin/views/homeadmin/tabgosta/tabgosta.component';
import { TabhabilidadeComponent } from './admin/views/homeadmin/tabhabilidade/tabhabilidade.component';
import { TesteComponent } from './teste/teste.component';

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
    ResetComponent,
    HomeadminComponent,
    EditaradminComponent,
    ListaComponent,
    TabperfilComponent,
    TabgostaComponent,
    TabhabilidadeComponent,
    TesteComponent
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
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  providers: [
    HomeService,
    LoginService,
    AuthGuardService,
    RespostaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
