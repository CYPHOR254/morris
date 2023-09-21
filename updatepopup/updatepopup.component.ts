import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {
  // Define a FormGroup
  form!: FormGroup;
  // Role list (assuming you have this data)
  rolelist = [
    { code: 'user', name: 'User' },
    { code: 'admin', name: 'Admin' },
    // Other role options
  ];

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService,
    private dialogref: MatDialogRef<Component>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    // Initialize the form and set the default value to 'user' or 'admin'
    this.form = this.fb.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      idNumber: ['', Validators.required],
      DOB: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: [''],
      gender: ['male'],
      schoolName: ['', Validators.required],
      location: ['', Validators.required],
      numberOfStreams: ['', Validators.required],
      numberOfStudents: ['', Validators.required],
      schoolEvents: ['', Validators.required],
      role: [''], // You can set a default role here
      isactive: [false]
    });

    if (this.data.usercode != '' && this.data.usercode != null) {
      this.loadUserData(this.data.usercode);
    }
  }

  loadUserData(code: any) {
    if (this.data.usercode) {
      this.form?.patchValue(this.data.usercode);
    }
  }
  

  updateUser() {
    // You can access the form values using this.form.value
    this.service.updateuser(this.data.usercode.id, this.form.value).subscribe((res: any) => {
      this.toastr.success('Updated successfully.');
      this.dialogref.close();
    });
  }
};

