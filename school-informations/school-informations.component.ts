import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-school-informations',
  templateUrl: './school-informations.component.html',
  styleUrls: ['./school-informations.component.css']
})
export class SchoolInformationsComponent implements OnInit {

  schoolsData: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the school ID from the route parameter
    const idusers = this.route.snapshot.paramMap.get('id');

    // Make an HTTP GET request to the server endpoint with the specific school ID
    this.http.get<any[]>(`http://localhost:8080/schools/${idusers}`).subscribe(
      (response) => {
        // Handle the response data here
        this.schoolsData = response; // Store the school information
        console.log(this.schoolsData); // Log the school information to the console
      },
      (error) => {
        console.error('Error fetching school information:', error);
      }
    );
  }
}
