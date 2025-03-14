import { Component, inject, Output, output } from '@angular/core';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { FirebaseService } from '../../shared/service/firebase.service';
import { RouterModule } from '@angular/router';
import { ContactDetailsComponent } from "./contact-details/contact-details.component";

@Component({
  selector: 'app-contacts',
  imports: [ContactsListComponent, RouterModule, ContactDetailsComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  firebase = inject(FirebaseService);

  openDetails: boolean = false;
}
