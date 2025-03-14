import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../../shared/service/firebase.service';
import { AddContactDialogComponent } from '../add-contact-dialog/add-contact-dialog.component';
import { CommonModule } from '@angular/common';
import { EditContactDialogComponent } from '../edit-contact-dialog/edit-contact-dialog.component';

@Component({
  selector: 'app-contacts-list',
  standalone:true,
  imports: [CommonModule, AddContactDialogComponent, EditContactDialogComponent],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent {
  firebase = inject(FirebaseService);
  isDialogOpen = false;  
  isEditDialogOpen = false;
  selectedContactIndex: number | null = null;

  openDialogDetails() {
    console.log("opening dialog details");
  }

  openAddNewContacts() {
    this.isDialogOpen = true;
  }

  openEditDialog(index: number) {
      this.isEditDialogOpen = true;
      this.selectedContactIndex = index;
      console.log(this.selectedContactIndex);
      
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
