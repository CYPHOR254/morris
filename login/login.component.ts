// import { Component } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr'
// import { AuthService } from '../service/auth.service';
// import { HttpClient } from '@angular/common/http';



// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })


// export class LoginComponent {
//   constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,private http: HttpClient,
//     private router: Router) {
//       sessionStorage.clear();

//   }
//   userdata: any;

//   loginform = this.builder.group({
//     email: this.builder.control('', Validators.required),
//     password: this.builder.control('', Validators.required)
//   });

//   proceedlogin() {
//     if (this.loginform.valid) {

//       const email = this.loginform.value.email; // Store the email value
    
//       if (email) {
//         this.http.post('http://localhost:8080/user/login', this.userdata).subscribe(

//         // this.service.proceedlogin(this.loginform.value).subscribe(
//           (response: any) => {
//             const token = response.token;
//             sessionStorage.setItem('email', email); // Use the stored email value
//             sessionStorage.setItem('token', token);
//             this.router.navigate(['/dashboard']);
//           }
//         ),
//           () => {
//             this.toastr.error('Invalid credentials');
//           }
//       }
//       else {
//         this.toastr.warning('Email is missing.');
//       }
//     } else {
//       this.toastr.warning('Please enter valid data.');
//     }
//   }
   
  
// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  // Define a FormGroup for your login form
  loginform: FormGroup = this.builder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  proceedlogin() {
    if (this.loginform.valid) {
      // Use the form values directly, no need to store them in a variable
      const email = this.loginform.value.email;
      const password = this.loginform.value.password;

      // Create an object to send to the server
      const requestData = {
        email: email,
        password: password
      };

      // Send a POST request to your server for login
      this.http.post('http://localhost:8080/user/login', requestData).subscribe(
        (response: any) => {
          const token = response.accessToken;
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('profile', response.profile);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error(error); // Log the error for debugging
          this.toastr.error('Invalid credentials');
        }
      );
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}

