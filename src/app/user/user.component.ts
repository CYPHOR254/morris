import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';

import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements AfterViewInit {

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private dialog: MatDialog
    
  ) {
    this.LoadUser();
  }

  userlist: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  LoadUser() {
    this.service.Getall().subscribe((res: any) => {
      console.log(res);
      this.userlist = res;
      this.dataSource.data = this.userlist;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  

  displayedColumns: string[] = [
    'firstName', 'lastName', 'email', 'phoneNumber', 'idNumber', 
     'schoolName', 'location', 'numberOfStudents',
    'numberOfStreams', 'status', 'role', 'action'
  ];

  updateuser(code: any) {
    this.OpenDialog('1000ms', '600ms', code);
    console.log(code);
  }

  deleteUser(code: any) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.service.deleteUser(code).subscribe(res => {
        console.log('User deleted:', res);
        this.LoadUser();
      });
    }
  }

  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        usercode: code
      }
    });
    popup.afterClosed().subscribe(res => {
      this.LoadUser();
    });
  }

// // Define the deleteUser, editUser, and updateUser functions
// deleteUser(user: any) {
//   // Implement the logic to delete the user
//   console.log('Deleting user:', user);
// }

editUser(user: any) {
  // Implement the logic to edit the user
  console.log('Editing user:', user);
}

updateUser(user: any) {
  // Implement the logic to update the user
  console.log('Updating user:', user);
}
  // Function to refresh the user list
  refreshUserList() {
    this.service.Getall().subscribe((res: any) => {
      console.log(res);
      this.userlist = res;
      this.dataSource.data = this.userlist;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}


 