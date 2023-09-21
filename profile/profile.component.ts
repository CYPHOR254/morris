// import { Component, OnInit } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SchoolDetailsComponent } from '../school-details/school-details.component';

interface School {
  id: number;
  idusers: number;
  schoolName: string;
  location: string;
  schoolCode: string;
  county: string;
  subcounty:string;
  logoUpload : Blob;
  images: string[]; // Array of image URLs
  autoId?: number; // Add autoId property here
  nearestTown?: string; // Define the property here
  numberOfStreams?: number; // Define the property here
  numberOfStudents?: number; // Define the property here
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  schoolsData: School[] = [];
  addSchoolModalOpen: boolean;
  addSchoolForm: FormGroup;
  userCount!: number;
  eventCount!: number;
  selectedImages: File[] = [];
  imageURLs: SafeUrl[] = [];
  selectedSchool: any; // Add selectedSchool property
  selectedSubcounty: any; // Define the property here
  selectedNearestTown: string | null = null;
  selectedNumberOfStreams: number | null = null;
  selectedNumberOfStudents: number | null = null;


  @ViewChild('addSchoolModalRef') viewSchoolModalRef!: ElementRef;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog, // Inject MatDialog
    private sanitizer: DomSanitizer,
     private route: ActivatedRoute,
  ) {
    this.addSchoolModalOpen = false;
    this.addSchoolForm = this.formBuilder.group({
      schoolName: ['', Validators.required],
      subcounty:['', Validators.required],
      location: ['', Validators.required],
      images: [[], Validators.required],
      // Add more form controls as needed
    });
   
  }

  ngOnInit(): void {
    // Get the school ID from the route parameter
    const schoolId = this.route.snapshot.paramMap.get('id');
    

    // Make an HTTP GET request to the server endpoint with the specific school ID
    this.http.get<any[]>(`http://localhost:8080/schools/${schoolId}`).subscribe(
      (response:any) => {
        // Handle the response data here
        this.schoolsData = response.school;// Store the school information
        console.log(this.schoolsData); // Log the school information to the console
        this.viewSchool( Number(schoolId))
      },
      (error) => {
        console.error('Error fetching school information:', error);
      }
    );
  }

  // View School function 
  fetchSchools(): void {
    this.http.get<any>('http://localhost:8080/schools/').subscribe(
      (response: any) => {
        const jsonData = response; // Directly assign the response
        this.schoolsData = jsonData;
      },
      (error) => {
        console.log('Error fetching schools:', error);
      }
    );
  }

  viewSchool(idusers: number) {
  
    this.selectedSchool = this.schoolsData.filter(school => school.idusers === idusers)[0];
    if (this.selectedSchool) {
      console.log(this.selectedSchool);
      
      // this.openViewSchoolModal();
    }
  }
  openViewSchoolModal() {
    const dialogRef = this.dialog.open(SchoolDetailsComponent, {
      data: this.selectedSchool // Pass the selected school data to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the modal is closed
    });
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