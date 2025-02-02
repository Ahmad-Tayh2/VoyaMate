// list.component.ts
import { Component, DoCheck, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IniteraryService } from 'src/app/core/services/initerary/initerary.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements DoCheck {
  itinerary = inject(IniteraryService);
  toastr = inject(ToastrService);
  router = inject(Router);
  places = this.itinerary.getPlaces();
  pendingPlace = this.itinerary.getPendingPlace() || undefined;
  time: string = '';

  ngDoCheck() {
    this.pendingPlace = this.itinerary.getPendingPlace();
  }

  timeFormat(time: string) {
    const today = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const selectedDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hours,
      minutes
    );

    return selectedDate.toISOString();
  }
  confirmPlace() {
    if (this.time) {
      this.itinerary.confirmPlace(this.timeFormat(this.time));
      this.time = '';
      this.places = this.itinerary.getPlaces();
    }
  }
  cancelPlace() {
    this.itinerary.cancelPlace();
  }
  createItinerary() {
    console.log(this.places);
    this.itinerary.createItinerary().subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success('Itinerary created successfully');
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.router.navigate(['/']);
  }
}
