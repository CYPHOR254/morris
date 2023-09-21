import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



const httpOptions = {
  Headers:new HttpHeaders({'content-Type' :'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uploadImages(formData: FormData) {
    throw new Error('Method not implemented.');
  }
  // private apiUrl = 'http://localhost:8080';
  private apiUrl = 'http ://localhost : 8080'

  constructor (private http: HttpClient,private route: ActivatedRoute,
    ) {} 
 
  // proceedregister(registerData: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/user/register`, registerData);
  // }
  proceedlogin(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, credentials); // Assuming your server's login endpoint is '/login'
  }
  
  GetUserbyCode(id: any) {
    console.log(id);
    const url = `${this.apiUrl}/${id}`; // Append the id to the URL
    return this.http.get(url);
  }
  
  getSchoolDetails(idusers: number): Observable<any> {
    return this.http.get(`http://localhost:8080/schools/${idusers}`);
  }

  Getall() {
    return this.http.get("http://localhost:8080/user/users"); // Update the URL to include "/user"
  }
  
 
  saveSchool(formData: any): Observable<any> {
    const url = `${this.apiUrl}/schools`; // Replace with the appropriate API endpoint for saving a school
    return this.http.post(url, formData);
  }
  updateuser(id: any, inputdata: any) {
    return this.http.put(this.apiUrl + '/' + id, inputdata);
  }
  getuserrole() {
    return this.http.get('http://localhost:8080/role');
  }
  isloggedin() {
    return sessionStorage.getItem('email') != null;
  }
  getrole() {
    return sessionStorage.getItem('role') != null ? sessionStorage.getItem('role')?.toString() : '';
  }
  GetAllEvent() {
    return this.http.get("http://localhost:8080/event/events");
  }
  Getaccessbyrole(role: any, menu: any) {
    return this.http.get('http://localhost:8080/roleaccess?role=' + role + '&menu=' + menu)
  }
  getEvents(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  // Add an event to the database
  addEvent(eventData: any): Observable<any> {    
    const url = `http://localhost:8080/event/add/events`; // Update with your event creation endpoint
    console.log(eventData);
    return this.http.post(url, eventData);
    

  }

    // Add a new image to the gallery
    addImage(formData: FormData): Observable<any> {
      const headers = new HttpHeaders();
      // You can set headers like authorization here if needed
  
      return this.http.post(`${this.apiUrl}/upload`, formData, { headers });
    }
  createEvent(eventData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, eventData);
  }

  deleteEvent(eventId: string): Observable<any> {
    const url = `${this.apiUrl}/${eventId}`;
    return this.http.delete<any>(url);
  }

  updateEvent(eventId: string, eventData: any): Observable<any> {
    const url = `${this.apiUrl}/${eventId}`;
    return this.http.put<any>(url, eventData);
  }
  editUser(id: any, userData: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, userData);
  }

  deleteUser(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
  getSchools(): Observable<any> {
    const url = 'http://localhost:8080/schools'; // Replace with the actual API endpoint to fetch schools
    return this.http.get<any>(url);
  }
}

