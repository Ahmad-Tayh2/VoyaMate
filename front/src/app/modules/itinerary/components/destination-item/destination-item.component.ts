import { Component, inject, Input } from '@angular/core';
import { IniteraryService } from 'src/app/core/services/initerary/initerary.service';
import { Place } from 'src/app/models/itinerary/itinerary.model';

@Component({
  selector: 'app-destination-item',
  templateUrl: './destination-item.component.html',
  styleUrls: ['./destination-item.component.css'],
})
export class DestinationItemComponent {
  @Input() place!: Place;
  itinerary = inject(IniteraryService);

  deletePlace(place: Place) {
    this.itinerary.deletePlace(place);
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const validFiles = files.filter((file) =>
        validImageTypes.includes(file.type)
      );
      if (validFiles.length > 0) {
        this.itinerary.uploadImage(this.place, validFiles);
      } else {
        console.error('No valid image files selected.');
        alert('Please select valid image files (JPEG, PNG, GIF).');
      }
    }
  }
  deleteImage(image: File) {
    this.itinerary.removeImage(this.place, image);
  }
}
