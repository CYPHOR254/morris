import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders,HttpEventType } from '@angular/common/http';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog ,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

// import { ReactiveFormsModule } from '@angular/forms';

interface County {
  name: string;
  capital: string;
  code: number;
  sub_counties: string[];
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  currentStep: number = 1;
  schoolsData: any[] = []; // Property to hold the schools' data
  selectedCounty: County | null = null;
  selectedSubcounty: string = '';
  apiLoaded: Observable<boolean>;
  countiesData: any[] = [
    {
      "name": "Baringo",
      "capital": "Kabarnet",
      "code": 30,
      "sub_counties": [
        "Baringo central",
        "Baringo north",
        "Baringo south",
        "Eldama ravine",
        "Mogotio",
        "Tiaty"
      ]
    },
    {
      "name": "Bomet",
      "capital": "Bomet",
      "code": 36,
      "sub_counties": [
        "Bomet central",
        "Bomet east",
        "Chepalungu",
        "Konoin",
        "Sotik"
      ]
    },
    {
      "name": "Bungoma",
      "capital": "Bungoma",
      "code": 39,
      "sub_counties": [
        "Bumula",
        "Kabuchai",
        "Kanduyi",
        "Kimilil",
        "Mt Elgon",
        "Sirisia",
        "Tongaren",
        "Webuye east",
        "Webuye west"
      ]
    },
    {
      "name": "Busia",
      "capital": "Busia",
      "code": 40,
      "sub_counties": [
        "Budalangi",
        "Butula",
        "Funyula",
        "Nambele",
        "Teso North",
        "Teso South"
      ]
    },
    {
      "name": "Elgeyo-Marakwet",
      "capital": "Iten",
      "code": 28,
      "sub_counties": [
        "Keiyo north",
        "Keiyo south",
        "Marakwet east",
        "Marakwet west"
      ]
    },
    {
      "name": "Embu",
      "capital": "Embu",
      "code": 14,
      "sub_counties": [
        "Manyatta",
        "Mbeere north",
        "Mbeere south",
        "Runyenjes"
      ]
    },
    {
      "name": "Garissa",
      "capital": "Garissa",
      "code": 7,
      "sub_counties": [
        "Daadab",
        "Fafi",
        "Garissa",
        "Hulugho",
        "Ijara",
        "Lagdera balambala"
      ]
    },
    {
      "name": "Homa Bay",
      "capital": "Homa Bay",
      "code": 43,
      "sub_counties": [
        "Homabay town",
        "Kabondo",
        "Karachwonyo",
        "Kasipul",
        "Mbita",
        "Ndhiwa",
        "Rangwe",
        "Suba"
      ]
    },
    {
      "name": "Isiolo",
      "capital": "Isiolo",
      "code": 11,
      "sub_counties": [
        "Isiolo",
        "Garba tula",
        "Merit"
      ]
    },
    {
      "name": "Kajiado",
      "code": 34,
      "sub_counties": [
        "Isinya.",
        "Kajiado Central.",
        "Kajiado North.",
        "Loitokitok.",
        "Mashuuru."
      ]
    },
    {
      "name": "Kakamega",
      "capital": "Kakamega",
      "code": 37,
      "sub_counties": [
        "Butere",
        "Kakamega central",
        "Kakamega east",
        "Kakamega north",
        "Kakamega south",
        "Khwisero",
        "Lugari",
        "Lukuyani",
        "Lurambi",
        "Matete",
        "Mumias",
        "Mutungu",
        "Navakholo"
      ]
    },
    {
      "name": "Kericho",
      "capital": "Kericho",
      "code": 35,
      "sub_counties": [
        "Ainamoi",
        "Belgut",
        "Bureti",
        "Kipkelion east",
        "Kipkelion west",
        "Soin sigowet"
      ]
    },
    {
      "name": "Kiambu",
      "capital": "Kiambu",
      "code": 22,
      "sub_counties": [
        "Gatundu north",
        "Gatundu south",
        "Githunguri",
        "Juja",
        "Kabete",
        "Kiambaa",
        "Kiambu",
        "Kikuyu",
        "Limuru",
        "Ruiru",
        "Thika town",
        "lari"
      ]
    },
    {
      "name": "Kilifi",
      "capital": "Kilifi",
      "code": 3,
      "sub_counties": [
        "Genzw",
        "Kaloleni",
        "Kilifi north",
        "Kilifi south",
        "Magarini",
        "Malindi",
        "Rabai"
      ]
    },
    {
      "name": "Kirinyaga",
      "capital": "Kerugoya/Kutus",
      "code": 20,
      "sub_counties": [
        "Kirinyaga central",
        "Kirinyaga east",
        "Kirinyaga west",
        "Mwea east",
        "Mwea west"
      ]
    },
    {
      "name": "Kisii",
      "capital": "Kisii",
      "code": 45,
      "sub_counties": [
        "Bobasi",
        "Bonchari",
        "South Mugirango",
        "West Mugirango",
        "North Mugirango",
        "Kitutu Chache North",
        "Kitutu Chache South",
        "Nyaribari Chache",
        "Nyaribari Masaba"

      ]
    },
    {
      "name": "Kisumu",
      "capital": "Kisumu",
      "code": 42,
      "sub_counties": [
        "Kisumu central",
        "Kisumu east ",
        "Kisumu west",
        "Mohoroni",
        "Nyakach",
        "Nyando",
        "Seme"
      ]
    },
    {
      "name": "Kitui",
      "capital": "Kitui",
      "code": 15,
      "sub_counties": [
        "Ikutha",
        "Katulani",
        "Kisasi",
        "Kitui central",
        "Kitui west ",
        "Lower yatta",
        "Matiyani",
        "Migwani",
        "Mutitu",
        "Mutomo",
        "Muumonikyusu",
        "Mwingi central",
        "Mwingi east",
        "Nzambani",
        "Tseikuru"
      ]
    },
    {
      "name": "Kwale",
      "capital": "Kwale",
      "code": 2,
      "sub_counties": [
        "Kinango",
        "Lungalunga",
        "Msambweni",
        "Mutuga"
      ]
    },
    {
      "name": "Laikipia",
      "capital": "Rumuruti",
      "code": 31,
      "sub_counties": [
        "Laikipia central",
        "Laikipia east",
        "Laikipia north",
        "Laikipia west ",
        "Nyahururu"
      ]
    },
    {
      "name": "Lamu",
      "capital": "Lamu",
      "code": 5,
      "sub_counties": [
        "Lamu East",
        "Lamu West"
      ]
    },
    {
      "name": "Machakos",
      "capital": "Machakos",
      "code": 16,
      "sub_counties": [
        "Kathiani",
        "Machakos town",
        "Masinga",
        "Matungulu",
        "Mavoko",
        "Mwala",
        "Yatta"
      ]
    },
    {
      "name": "Makueni",
      "capital": "Wote",
      "code": 17,
      "sub_counties": [
        "Kaiti",
        "Kibwei west",
        "Kibwezi east",
        "Kilome",
        "Makueni",
        "Mbooni"
      ]
    },
    {
      "name": "Mandera",
      "capital": "Mandera",
      "code": 9,
      "sub_counties": [
        "Banissa",
        "Lafey",
        "Mandera East",
        "Mandera North",
        "Mandera South",
        "Mandera West"
      ]
    },
    {
      "name": "Marsabit",
      "capital": "Marsabit",
      "code": 10,
      "sub_counties": [
        "Laisamis",
        "Moyale",
        "North hor",
        "Saku"
      ]
    },
    {
      "name": "Meru",
      "capital": "Meru",
      "code": 12,
      "sub_counties": [
        "Buuri",
        "Igembe central",
        "Igembe north",
        "Igembe south",
        "Imenti central",
        "Imenti north",
        "Imenti south",
        "Tigania east",
        "Tigania west"
      ]
    },
    {
      "name": "Migori",
      "capital": "Migori",
      "code": 44,
      "sub_counties": [
        "Awendo",
        "Kuria east",
        "Kuria west",
        "Mabera",
        "Ntimaru",
        "Rongo",
        "Suna east",
        "Suna west",
        "Uriri"
      ]
    },
    {
      "name": "Mombasa",
      "capital": "Mombasa City",
      "code": 1,
      "sub_counties": [
        "Changamwe",
        "Jomvu",
        "Kisauni",
        "Likoni",
        "Mvita",
        "Nyali"
      ]
    },
    {
      "name": "Murang'a",
      "capital": "Murang'a",
      "code": 21,
      "sub_counties": [
        "Gatanga",
        "Kahuro",
        "Kandara",
        "Kangema",
        "Kigumo",
        "Kiharu",
        "Mathioya",
        "Murang’a south"
      ]
    },
    {
      "name": "Nairobi",
      "capital": "Nairobi City",
      "code": 47,
      "sub_counties": [
        "Dagoretti North Sub County",
        "Dagoretti South Sub County ",
        "Embakasi Central Sub Count",
        "Embakasi East Sub County",
        "Embakasi North Sub County ",
        "Embakasi South Sub County",
        "Embakasi West Sub County",
        "Kamukunji Sub County",
        "Kasarani Sub County ",
        "Kibra Sub County ",
        "Lang'ata Sub County ",
        "Makadara Sub County",
        "Mathare Sub County ",
        "Roysambu Sub County ",
        "Ruaraka Sub County ",
        "Starehe Sub County ",
        "Westlands Sub County "
      ]
    },
    {
      "name": "Nakuru",
      "capital": "Nakuru",
      "code": 32,
      "sub_counties": [
        "Bahati",
        "Gilgil",
        "Kuresoi north",
        "Kuresoi south",
        "Molo",
        "Naivasha",
        "Nakuru town east",
        "Nakuru town west",
        "Njoro",
        "Rongai",
        "Subukia"
      ]
    },
    {
      "name": "Nandi",
      "capital": "Kapsabet",
      "code": 29,
      "sub_counties": [
        "Aldai",
        "Chesumei",
        "Emgwen",
        "Mosop",
        "Namdi hills",
        "Tindiret"
      ]
    },
    {
      "name": "Narok",
      "capital": "Narok",
      "code": 33,
      "sub_counties": [
        "Narok east",
        "Narok north",
        "Narok south",
        "Narok west",
        "Transmara east",
        "Transmara west"
      ]
    },
    {
      "name": "Nyamira",
      "capital": "Nyamira",
      "code": 46,
      "sub_counties": [
        "Borabu",
        "Manga",
        "Masaba north",
        "Nyamira north",
        "Nyamira south"
      ]
    },
    {
      "name": "Nyandarua",
      "capital": "Ol Kalou",
      "code": 18,
      "sub_counties": [
        "Kinangop",
        "Kipipiri",
        "Ndaragwa",
        "Ol Kalou",
        "Ol joro orok"
      ]
    },
    {
      "name": "Nyeri",
      "capital": "Nyeri",
      "code": 19,
      "sub_counties": [
        "Kieni east",
        "Kieni west",
        "Mathira east",
        "Mathira west",
        "Mkurweni",
        "Nyeri town",
        "Othaya",
        "Tetu"
      ]
    },
    {
      "name": "Samburu",
      "capital": "Maralal",
      "code": 25,
      "sub_counties": [
        "Samburu east",
        "Samburu north",
        "Samburu west"
      ]
    },
    {
      "name": "Siaya",
      "capital": "Siaya",
      "code": 41,
      "sub_counties": [
        "Alego usonga",
        "Bondo",
        "Gem",
        "Rarieda",
        "Ugenya",
        "Unguja"
      ]
    },
    {
      "name": "Taita-Taveta",
      "capital": "Voi",
      "code": 6,
      "sub_counties": [
        "Mwatate",
        "Taveta",
        "Voi",
        "Wundanyi"
      ]
    },
    {
      "name": "Tana River",
      "capital": "Hola",
      "code": 4,
      "sub_counties": [
        "Bura",
        "Galole",
        "Garsen"
      ]
    },
    {
      "name": "Tharaka-Nithi",
      "capital": "Chuka",
      "code": 13,
      "sub_counties": [
        "Chuka",
        "Igambangobe",
        "Maara",
        "Muthambi",
        "Tharak north",
        "Tharaka south"
      ]
    },
    {
      "name": "Trans-Nzoia",
      "capital": "Kitale",
      "code": 26,
      "sub_counties": [
        "Cherangany",
        "Endebess",
        "Kiminini",
        "Kwanza",
        "Saboti"
      ]
    },
    {
      "name": "Turkana",
      "capital": "Lodwar",
      "code": 23,
      "sub_counties": [
        "Loima",
        "Turkana central",
        "Turkana east",
        "Turkana north",
        "Turkana south"
      ]
    },
    {
      "name": "Uasin Gishu",
      "capital": "Eldoret",
      "code": 27,
      "sub_counties": [
        "Ainabkoi",
        "Kapseret",
        "Kesses",
        "Moiben",
        "Soy",
        "Turbo"
      ]
    },
    {
      "name": "Vihiga",
      "capital": "Vihiga",
      "code": 38,
      "sub_counties": [
        "Emuhaya",
        "Hamisi",
        "Luanda",
        "Sabatia",
        "vihiga"
      ]
    },
    {
      "name": "Wajir",
      "capital": "Wajir",
      "code": 8,
      "sub_counties": [
        "Eldas",
        "Tarbaj",
        "Wajir East",
        "Wajir North",
        "Wajir South",
        "Wajir West"
      ]
    },
    {
      "name": "West Pokot",
      "capital": "Kapenguria",
      "code": 24,
      "sub_counties": [
        "Central Pokot",
        "North Pokot",
        "Pokot South",
        "West Pokot"
      ]
    }
  ];


  constructor(
    private builder: FormBuilder,
    private httpClient: HttpClient,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private dialog: MatDialog
  ) { this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAGkUsxirBbtyDbPjvbH8JfH8vxuXKLFNE', 'callback')
  .pipe(
    map(() => true),
    catchError(() => of(false)),
  ); }

  registerform = this.builder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    phoneNumber: ['', Validators.required],
    idNumber: ['', Validators.required],
    dob: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    gender: ['male'],
    schoolName: ['', Validators.required],
    location: ['', Validators.required],
    logoUpload: ['',Validators.required], // Initialize the logoUpload form control
    schoolCode: ['', Validators.required],
    schoolRegNo: ['', Validators.required],
    county: ['', Validators.required],
    subcounty: ['', Validators.required],
    nearestTown: ['', Validators.required],
    ward: ['', Validators.required],
    numberOfStreams: ['', Validators.required],
    numberOfStudents: ['', Validators.required],
    role: ['user'],
    isactive: [false]
  });

  openDialog(message: string): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(() => {
      // Dialog closed callback (if needed)
    });
  }

// Inside your component class
logoPreviewUrl: string = '';

handleLogoUpload(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.registerform.get('logoUpload')?.setValue(file);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.logoPreviewUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}



  ngOnInit() { }
  // Function to handle the change event of the county dropdown
  onCountyChange() {
    // Get the selected county value from the form control
    const selectedCountyName = this.registerform.value.county;

    // Find the selected county object from the countiesData array based on the name
    this.selectedCounty = this.countiesData.find(county => county.name === selectedCountyName) || null;

    // If the selected county object is found, update the subcounty dropdown options
    if (this.selectedCounty) {
      this.registerform.get('subcounty')?.setValue(''); // Reset the subcounty value
      this.registerform.get('subcounty')?.enable(); // Enable the subcounty dropdown

      // Update the subcounty options based on the selected county
      this.registerform.get('subcounty')?.setValidators([Validators.required]);
      this.registerform.get('subcounty')?.updateValueAndValidity();
    } else {
      // If the selected county is not found, disable the subcounty dropdown
      this.registerform.get('subcounty')?.disable();
      this.registerform.get('subcounty')?.clearValidators();
      this.registerform.get('subcounty')?.updateValueAndValidity();
    }
  }


  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  };

  proceedregister() {
    if (this.registerform.valid) {
      const registerData = new FormData();
  
      // Append form data to the registerData object
      Object.keys(this.registerform.value).forEach(key => {
        const formControl = this.registerform.get(key);
        if (formControl) {
          if (key === 'logoUpload') {
            const logoValue = formControl.value;
            if (logoValue instanceof Blob) {
              registerData.append(key, logoValue, logoValue.name); // Append logo image
            }
          } else {
            registerData.append(key, formControl.value);
          }
        }
      });
  
      // Make an HTTP POST request with the FormData
      this.http.post('http://localhost:8080/user/register', registerData).subscribe(
        (response => {
          if (response) {
            // Registration success
            console.log("we wre here");
            
            this.showDialog('Registered Successfully', 'Proceed to the next part.');
            this.router.navigate(['/payment']);

          }
          //  else {
          //   // Registration failed
          //   this.showDialog('Registration Failed', 'Please contact admin for assistance.');
          //   console.error('Error registering user:', response);
          // }
        }),
        catchError(error => {
          // Registration failed
          this.showDialog('Registration Failed', 'Please contact admin for assistance.');
          console.error('Error registering user:', error);
          return of(null);
        })
      )
    } else {
      // Show warning Toastr notification
      this.toastr.warning('Please enter valid data.', 'Warning');
    }
  }
  

  
  
  // proceedregister() {
  //   if (this.registerform.valid) {
  //     const registerData = this.registerform.value;
  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json'
  //       })
  //     };
  
  //     // Remove the confirmPassword field from the registerData object
  //     delete registerData.confirmPassword;
  
  //     this.http.post('http://localhost:8080/user/register', registerData, httpOptions).subscribe(
  //       () => {
  //         // Registration success
  //         this.showDialog('Registered Successfully', 'Proceed to the next part.');
  //         this.router.navigate(['/payment']);
  //         console.log(registerData);
  //       },
  //       (error) => {
  //         // Registration failed
  //         this.showDialog('Registration Failed', 'Please contact admin for assistance.');
  //         console.error('Error registering user:', error);
  //       }
  //     );
  //   } else {
  //     // Show warning Toastr notification
  //     this.toastr.warning('Please enter valid data.', 'Warning');
  //   }
  // }
  
  showDialog(title: string, message: string): void {
    this.dialog.open(DialogBoxComponent, {
      width: '400px',
      data: { title: title, message: message }
    });
  }
  
}
  

  





