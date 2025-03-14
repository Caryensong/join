import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FirebaseService } from '../../../shared/service/firebase.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { log } from 'console';

@Component({
  selector: 'app-edit-contact-dialog',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-contact-dialog.component.html',
  styleUrl: './edit-contact-dialog.component.scss'
})
export class EditContactDialogComponent {
  firebase = inject(FirebaseService);
  @Output() closeDialogEvent = new EventEmitter<void>();
  @Input() selectedContactIndex: number | null = null;
  // isEdited: boolean = false;
  formSubmitted: boolean = false;
  contactId: string = "";
  editedContact = {
    fullname:'',
    firstname:'catalina',
    lastname: '',
    email: '',
    phone:'',
    color: '',
  }

  constructor() {
    console.log(this.selectedContactIndex);
    
  }
  onEditContact(contactForm: NgForm) {
    this.formSubmitted = true;
    if (this.selectedContactIndex !== null) {
      if(contactForm.valid) {
        this.editContact(this.selectedContactIndex);
      }
    }
  }

  editContact(index: number) {
    // this.isEdited = true;
    const nameParts = this.editedContact.fullname.trim().split(' ');
    this.editedContact.firstname = this.toUpperCaseName(nameParts[0]);
    this.editedContact.lastname = this.toUpperCaseName(nameParts.slice(1).join(' ') || '');
    this.editedContact = {
      fullname: '',
      firstname: this.firebase.orderedContactsList[index].firstname,
      lastname: this.firebase.orderedContactsList[index].lastname,
      email: this.firebase.orderedContactsList[index].email,
      phone: this.firebase.orderedContactsList[index].phone,
      color: '',
    }
  }

  saveEdit() {
    if (this.contactId) {
      this.firebase.editContactToDatabase(this.contactId, this.editedContact)
    }
  }

  toUpperCaseName(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // closeDialog() {
  //   this.closeDialogEvent.emit(); 
  // }

}
