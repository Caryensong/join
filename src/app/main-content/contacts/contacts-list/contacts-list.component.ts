import { Component, inject, Output } from '@angular/core';
import { FirebaseService } from '../../../shared/service/firebase.service';
import { AddContactDialogComponent } from '../add-contact-dialog/add-contact-dialog.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contacts-list',
  standalone:true,
  imports: [CommonModule, AddContactDialogComponent, RouterModule],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent {
  firebase = inject(FirebaseService);
  isDialogOpen = false;  

  @Output()openDetails: boolean = false;

  openDialogDetails() {
    console.log("opening dialog details");
    this.openDetails = true;
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
