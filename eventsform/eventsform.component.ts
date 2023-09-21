import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-eventsform',
  templateUrl: './eventsform.component.html',
  styleUrls: ['./eventsform.component.css'],
})
export class EventsformComponent implements OnInit {
  @ViewChild('editModal') editModalRef!: ElementRef; // Reference to the edit modal element
  rowNumber: number = 0; // Initialize the row number to 0
  schId: string = '';
  event: any;


  eventDetails: FormGroup; // Initialize the FormGroup here
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'eventName',
    'eventType',
    'eventDate',
    'eventTime',
    'location',
    'status',
    'action',
  ];

  selectedEvent: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService // Inject AuthService here
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
    this.eventDetails = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventType: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventTime: ['', Validators.required],
      location: ['', Validators.required],
      status: ['', Validators.required],
      idschools: ['', Validators.required]

    });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      // Retrieve the idschools parameter from the route
      const schoolId = this.route.snapshot.paramMap.get('id');
      this.schId = schoolId!;

      if (schoolId) {
        // Use the idschools value to construct the URL for fetching events
        const url = `http://localhost:8080/event/schools/${schoolId}/events`;

        // Call your authService.getEvents() method with the dynamically generated URL
        this.authService.getEvents(url).subscribe(
          (events) => {
            // Sort the events by id in ascending order
            this.dataSource.data = events.sort(
              (a: { id: number }, b: { id: number }) => a.id - b.id
            );

            // Calculate the row number for each event
            this.dataSource.data.forEach((event, index) => {
              event.rowNumber = ++this.rowNumber;
            });
          },
          (error) => {
            console.error('Error getting events:', error);
          }
        );
      }
    });
    this.dataSource.data = [
      {
        id: 1,
        eventName: 'Event 1',
        eventType: 'Conference',
        eventDate: '2023-09-15',
        eventTime: '10:00 AM',
        location: 'San Francisco, CA',
        status: 'Planning'
      },
      {
        id: 2,
        eventName: 'Event 2',
        eventType: 'Workshop',
        eventDate: '2023-09-16',
        eventTime: '1:00 PM',
        location: 'Los Angeles, CA',
        status: 'Confirmed'
      }
    ];

  };
  
  addEvent(): void {
    console.log("am here");
    
    if (this.eventDetails.valid) {
      const eventData = {
        eventName: this.eventDetails.value.eventName,
        eventType: this.eventDetails.value.eventType,
        eventDate: this.eventDetails.value.eventDate,
        eventTime: this.eventDetails.value.eventTime,
        location: this.eventDetails.value.location,
        idschools: this.schId,
        status: 'active',
      };

      this.authService.addEvent(eventData).subscribe(
        (response: any) => {
          const newEvent = response;

          this.dataSource.data.push(newEvent);
          newEvent.rowNumber = ++this.rowNumber;

          this.dataSource._updateChangeSubscription();
          this.toastr.success('Event added successfully.');
          this.eventDetails.reset();
        },
        (error: any) => {
          console.error('Error adding event:', error);
          this.toastr.error('Error adding event: ' + error.message);
        }
      );
    } else {
      this.toastr.error('Please fill in all the required fields.');
    }
  }
  // addEvent(): void {
  //   if (this.eventDetails.valid) {
  //     const eventData = {
  //       eventName: this.eventDetails.value.eventName,
  //       eventType: this.eventDetails.value.eventType,
  //       eventDate: this.eventDetails.value.eventDate,
  //       eventTime: this.eventDetails.value.eventTime,
  //       location: this.eventDetails.value.location,
  //       status: 'active',
  //       idschools: this.schId,
  //     };


  //     // Log the eventData before making the HTTP request
  //     console.log('Sending eventData to backend:', eventData);
  //     // Call the AuthService's addEvent method to add the event to the database
  //     this.authService.addEvent(eventData).subscribe(
  //       (response: any) => {
  //         // Handle success (you can retrieve the newly created event ID from the response)
  //         const newEvent = response; // Assuming the server returns the new event with its unique ID

  //         // Update the local data source with the newly created event
  //         this.dataSource.data.push(newEvent);

  //         // Calculate the row number for the newly added event
  //         newEvent.rowNumber = ++this.rowNumber;

  //         this.dataSource._updateChangeSubscription();
  //         this.toastr.success('Event added successfully.');
  //         this.eventDetails.reset();
  //         this.ngOnInit();
  //         this.closeModal();
  //       },
  //       (error: any) => {
  //         console.error('Error adding event:', error);
  //         this.toastr.error('Error adding event: ' + error.message);
  //       }
  //     );
  //   } else {
  //     this.toastr.error('Please fill in all the required fields.');
  //   }
  // }

  removeEvent(selectedEvent: any): void {
    console.log(selectedEvent);
    console.log(selectedEvent.idevents)

    if (selectedEvent && selectedEvent.idevents) {
      const eventId = selectedEvent.idevents;

      // Construct the URL with the dynamic event ID for deletion
      const deleteEventUrl = `http://localhost:8080/event/delete/events/${eventId}`;
      // Send a DELETE request to delete the event
      this.http.delete(deleteEventUrl).subscribe(
        () => {
          // Event deleted successfully
          this.toastr.success('Event deleted successfully.');
          this.ngOnInit();
          this.closeModal();

        },
        (error: any) => {
          console.error('Error deleting event:', error);
          this.toastr.error('Error deleting event.');
        }
      );
    } else {
      this.toastr.error('Please select an event to delete.');
    }
  };

  openEditModal(event: any): void {
    // Store the selected event in the component
    this.selectedEvent = event;

    console.log('Selected Event:', this.selectedEvent); // Add this line to check the selected event

    // Populate the form fields with the selected event's data
    this.eventDetails.patchValue({
      eventName: this.selectedEvent.eventName,
      eventDate: this.selectedEvent.eventDate,
      eventType: this.selectedEvent.eventType,
      eventTime: this.selectedEvent.eventTime,
      location: this.selectedEvent.location,
      status: event.status,
      idschools: event.idschools,
    });
    const editModalElement = this.editModalRef.nativeElement as HTMLElement;
    editModalElement.classList.add('show');
    editModalElement.style.display = 'block';
  }


  closeModal(): void {
    const editModalElement = this.editModalRef.nativeElement as HTMLElement;
    editModalElement.classList.remove('show');
    editModalElement.style.display = 'none';
    this.eventDetails.reset();
    this.selectedEvent = null; // Reset the selected event
  }

  updateEvent(selectedEvent: any): void {
    console.log(selectedEvent);

    if (selectedEvent && selectedEvent.idevents) {
      const eventId = selectedEvent.idevents; // Make sure selectedEvent.id is defined
      const eventData = {
        eventName: this.eventDetails.value.eventName,
        eventType: this.eventDetails.value.eventType,
        eventDate: this.eventDetails.value.eventDate,
        eventTime: this.eventDetails.value.eventTime,
        location: this.eventDetails.value.location,
        idschools: this.eventDetails.value.idschools,
        status: this.eventDetails.value.status,

      };

      // Check if any field has been modified
      const modifiedFields = Object.keys(eventData).filter(
        (key) => (eventData as any)[key] !== (selectedEvent as any)[key]
      );

      if (modifiedFields.length === 0) {
        this.toastr.error('No fields have been modified.');
        return;
      }

      // Construct the URL with the dynamic event ID
      const updateEventUrl = `http://localhost:8080/event/update/events/${eventId}`;

      // Send a PATCH request to update the event with the modified fields
      this.http.put(updateEventUrl, eventData).subscribe(
        (response: any) => {
          const updatedEvent = response; // Assuming the server returns the updated event

          // Update the event in the local data source
          const index = this.dataSource.data.findIndex(
            (event) => event.id === updatedEvent.id
          );
          if (index !== -1) {
            // Merge the updated fields with the existing event data
            this.dataSource.data[index] = { ...this.dataSource.data[index], ...updatedEvent };
            this.dataSource._updateChangeSubscription();
          }

          // Handle success
          this.toastr.success('Event updated successfully.');
          this.closeModal();
          this.ngOnInit();
        },
        (error: any) => {
          console.error('Error updating event:', error);
          this.toastr.error('Error updating event: ' + error.message);
        }
      );
    } else {
      this.toastr.error('Please select an event to update.');
    }
    
  }

  // removeEvent(eventId: number): void {

  //   console.log(eventId);

  //     const index = this.dataSource.data.findIndex(
  //       (event) => event.id === eventId
  //     );
  //     if (index !== -1) {
  //       this.dataSource.data.splice(index, 1);
  //       this.dataSource._updateChangeSubscription();
  //       this.toastr.success('Event deleted successfully.');
  //     }
  //   }
  // removeEvent(selectedEventId: number): void {
  //     //     // Assuming you want to prompt the user for confirmation before deleting
  //    const confirmDeleteDialog = window.confirm(`Are you sure you want to delete the event?`);
  //   // Remove the selected event from the data source.
  //   const index = this.dataSource.data.findIndex(
  //     (event) => event.id === selectedEventId
  //   );

  //   if (index !== -1) {
  //     this.dataSource.data.splice(index, 1);
  //   }

  //   // Update the Angular change detection mechanism.
  //   this.dataSource._updateChangeSubscription();

  //   // Display a success message to the user.
  //   this.toastr.success('Event deleted successfully.');
  // }

}

