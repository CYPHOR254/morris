

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from 'src/material.module';
// import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatRadioModule } from '@angular/material/radio';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { CustomerComponent } from './customer/customer.component';
import { EventsComponent } from './events/events.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchoolsComponent } from './schools/schools.component';
import { EventsformComponent } from './eventsform/eventsform.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HavardComponent } from './havard/havard.component';
import { RuaiComponent } from './ruai/ruai.component';
import { PaymentComponent } from './payment/payment.component';
import { SchoolDetailsComponent } from './school-details/school-details.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { SchoolInformationsComponent } from './school-informations/school-informations.component';
import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';

// import { AuthInterceptorproviders } from './_helpers/auth.interceptor'  ;

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    UpdatepopupComponent,
    CustomerComponent,
    EventsComponent,
    AboutComponent,
    ContactComponent,
    ForgotpasswordComponent,
    DashboardComponent,
    SchoolsComponent,
    EventsformComponent,
    NavigationComponent,
    HavardComponent,
    RuaiComponent,
    PaymentComponent,
    SchoolDetailsComponent,
    DialogBoxComponent,
    GalleryComponent,
    SchoolInformationsComponent,
    ProfileComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatRadioModule,
    MaterialModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GoogleMapsModule,
    ToastrModule.forRoot(),
    NgbAccordionModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbModule,
  ],
  // providers: [AuthInterceptorproviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
