import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';


interface School {
  id: number;
  schoolName: string;
  location: string;
  schoolCode: string;
  county: string;
  images: string[]; // Array of image URLs
  autoId?: number; // Add autoId property here
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  schoolsData: any[] = []; // Initialize an empty array to store the fetched data
  addSchoolModalOpen: boolean;
  addSchoolForm: FormGroup;
  userCount!: number;
  eventCount!: number;
  selectedImages: File[] = [];
  imageURLs: SafeUrl[] = [];

  @ViewChild('addSchoolModalRef') addSchoolModalRef!: ElementRef;
  dataSource: any = {
    data: []
  };
  toastr: any;
  eventDetails: any;
  // router: any;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router // Inject the Router here

  ) {
    this.addSchoolModalOpen = false;
    this.addSchoolForm = this.formBuilder.group({
      schoolName: ['', Validators.required],
      location: ['', Validators.required],
      images: [[], Validators.required],
      
      // Add more form controls as needed
    });
    this.getUserCount();
    this.getEventCount();
  }

  getUserCount(): void {
    this.authService.Getall().subscribe((users: any) => {
      this.userCount = users.length;
    });
  }

  getEventCount(): void {
    this.authService.GetAllEvent().subscribe((eventsform: any) => {
      this.eventCount = eventsform.length;
    });
  }
  ngOnInit() {
    this.fetchSchools();
  }
   
  fetchSchools(): void {
    this.http.get<any>('http://localhost:8080/schools').subscribe(
      (response: any) => {
        this.schoolsData = response; // Directly assign the response to the schoolsData array
      },
      (error) => {
        console.log('Error fetching schools:', error);
      }
    );
  }
  
  viewSchool(schoolCode: number) {
    console.log('View button clicked for school with ID:', schoolCode);
    this.router.navigate(['/schooldetails', schoolCode]);
  }
  
  
  //   viewSchool(id: number) {
  //   // Implement the action when the "View" button is clicked.
  //   // For example, you can navigate to a new page to show the details of the selected school.
  //   this.router.navigate(['/schooldetails', id]);
  //   console.log(`View School with ID: ${id}`);
  // }
  viewSchoolDetails(school: School) {
    console.log('View School:', school);
    // Implement logic to open modal and pass selected school details
  }

  editSchoolDetails(school: School) {
    console.log('Edit School:', school);
    // Implement logic to edit school details
  }

  deleteSchool(school: School) {
    console.log('Delete School:', school);
    // Implement logic to delete the school
  }

  openAddSchoolModal() {
    this.addSchoolModalOpen = true;
  }

  closeAddSchoolModal() {
    this.addSchoolModalOpen = false;
    this.addSchoolForm.reset();
    this.selectedImages = [];
    this.imageURLs = [];
  }
  onImageSelect(event: any) {
    const files = event.target?.files;
    if (files && files.length > 0) {
      this.selectedImages = Array.from(files);
      const readerPromises = [];
      for (let i = 0; i < this.selectedImages.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedImages[i]);
        readerPromises.push(
          new Promise(resolve => {
            reader.onload = (event: any) => resolve(event.target.result);
          })
        );
      }
      Promise.all(readerPromises).then((results: any) => {
        this.imageURLs = results.map((result: string) => this.sanitizer.bypassSecurityTrustUrl(result));
      });
    }
  }
  
  addNewSchool() {
    if (this.addSchoolForm.valid && this.selectedImages.length > 0) {
      const formData = new FormData();
      formData.append('schoolName', this.addSchoolForm.value.schoolName);
      formData.append('location', this.addSchoolForm.value.location);
      for (let i = 0; i < this.selectedImages.length; i++) {
        formData.append('images', this.selectedImages[i]);
      }
  
      this.http.post<School>('http://localhost:3000/schools', formData).subscribe(
        response => {
          // Handle successful response
          this.fetchSchools();
          this.closeAddSchoolModal();
        },
        error => {
          console.log('Error adding school:', error);
        }
      );
    } else {
      console.log('Invalid form data or no images selected.');
    }
  }
  
 
}

