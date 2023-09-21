import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  images: any[] = [];
  imageUrl: any;
  image!: Blob;

  constructor(private http: HttpClient,
    private route: ActivatedRoute

    ) { }

  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages(): void {
 // Get the school ID from the route parameter
 const schoolId = this.route.snapshot.paramMap.get('id');

    this.http.get<any[]>(`http://localhost:8080/image/api/images/ ${schoolId}`).subscribe(
      (response: any[]) => {
        this.images = response;
        this.getImageUrl(String(__filename))
      },
      (error) => {
        console.log('Error fetching images:', error);
        this.getImageUrl(__filename)
      }
    );
  }

  getImageUrl(filename: string): string {
    // Assuming your images are stored in the 'public' directory on your server
    return `/public/images ${filename}`;
  }

  // @ViewChild('fileInput') fileInput: any;

  // Function to open the file input when the button is clicked
  openFileInput(): void {
    // Do nothing
  }

  // Function to handle the file selection event
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      // A file is selected, and you can access it as inputElement.files[0]
      const selectedFile = inputElement.files[0];

      // Convert the file to a Blob object
      this.image = new Blob([selectedFile]);
    }
  }
};
