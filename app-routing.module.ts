import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchoolsComponent } from './schools/schools.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { EventsformComponent} from './eventsform/eventsform.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HavardComponent } from './havard/havard.component';
import { RuaiComponent } from './ruai/ruai.component';
import { PaymentComponent } from './payment/payment.component';
import { SchoolDetailsComponent } from './school-details/school-details.component';
import { GalleryComponent } from './gallery/gallery.component';
import {ProfileComponent} from './profile/profile.component'







const routes: Routes = [
  { component: LoginComponent, path: 'login' },
  { component: RegisterComponent, path: 'register' },
  { component: HomeComponent, path: '' },
  { component: UserComponent, path: 'user',  },
  // { component: EventsformComponent, path: 'eventsform' },
  { component: CustomerComponent, path: 'customer', canActivate: [AuthGuard] },
  { component: EventsComponent, path: 'events' },
  { component: ContactComponent, path: 'contact' },
  {component: NavigationComponent, path: 'nav'},
  { component: AboutComponent, path: 'about' },
  { component: HavardComponent, path: 'havard' },
  { component: RuaiComponent, path: 'ruai' },
  { component: PaymentComponent, path: 'payment' },
  { component: ProfileComponent, path: 'profile' },
  { component: SchoolDetailsComponent, path: 'schooldetails' },
  // { component: GalleryComponent, path: 'gallerydetails/:id' },
  // { component: SchoolInformationsComponent, path: 'Schooltab' },
  { path: 'schooldetails/:id', component: SchoolDetailsComponent },
  { path: 'gallerydetails/:id', component: GalleryComponent },
  { path: 'eventsform/:id', component: EventsformComponent },


  
  {
    component: DashboardComponent, path: 'dashboard', children: [{
      path: '',
      component: UserComponent,
    }

    ]
    , canActivate: [AuthGuard]
  },
  { component: SchoolsComponent, path: 'schools' },
  { component: ForgotpasswordComponent, path: 'forgotpassword' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
