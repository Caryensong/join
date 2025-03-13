import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../../shared/service/firebase.service';
import { AddContactDialogComponent } from '../add-contact-dialog/add-contact-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts-list',
  standalone:true,
  imports: [CommonModule, AddContactDialogComponent],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent {
  firebase = inject(FirebaseService);
  isDialogOpen = false;  

  openDialogDetails() {
    console.log("opening dialog details");
  }

  openAddNewContacts() {
    this.isDialogOpen = true;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

closeDialog() { 
  const dialogElement = document.querySelector('.custom-dialog');
  
  if (dialogElement) {
      dialogElement.classList.add('dialog-closed');

      setTimeout(() => {
          this.isDialogOpen = false;
      }, 500);
  } else {
      this.isDialogOpen = false;
  }
}

}
