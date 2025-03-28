import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FirebaseService } from '../../../shared/service/firebase.service';
import { ContactInterface } from '../contact-interface';

@Component({
  selector: 'app-delete-dialog',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {
  firebaseService =inject(FirebaseService);
  @Input() contact!: ContactInterface; 
  @Output() closeDialogEvent = new EventEmitter<void>();
  contactId?: string= '';
  @Output() contactDeletedEvent = new EventEmitter<void>();

  deleteItem(){
    this.contactId = this.contact.id;
    if(this.contactId){
      this.firebaseService.deleteContactFromData(this.contactId);
      this.contactDeletedEvent.emit(); 
      this.closeDialog();
    }
  }

  closeDialog() {
    this.closeDialogEvent.emit();
  }
}
