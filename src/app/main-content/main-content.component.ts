import { Component } from '@angular/core';
import { ContactsComponent } from './contacts/contacts.component';


@Component({
  selector: 'app-main-content',
  imports: [ContactsComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
