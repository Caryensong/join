import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore, onSnapshot, orderBy, query } from '@angular/fire/firestore';
import { ContactInterface } from '../../main-content/contacts/contact-interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firebase = inject(Firestore);
  contactsList: ContactInterface[] = [];
  orderedContactsList: ContactInterface[] = [];
  unsubscribe;

  constructor() {
    this.unsubscribe = onSnapshot(collection(this.firebase, "contacts"), (joinObjects) => {
      this.contactsList = [];
      joinObjects.forEach((element) => {
        this.contactsList.push(this.setContactObject(element.id, element.data() as ContactInterface))
      })
    });
    this.orderedListQuery();
  }

  orderedListQuery() {
    const contactsRef = collection(this.firebase, "contacts")
    const q = query(contactsRef, orderBy('firstname'));
    return onSnapshot(q, (list) => {
      this.orderedContactsList = [];
      list.forEach(element => {
        this.orderedContactsList.push(this.setContactObject(element.id, element.data() as ContactInterface))
      });
    })
  }

  async addContactToData(contactsList:ContactInterface){
    await addDoc(collection(this.firebase, "contacts"), contactsList);
  }
  
  setContactObject(id: string, obj: ContactInterface): ContactInterface {
    return {
      id: id,
      email: obj.email,
      firstname: obj.firstname,
      lastname: obj.lastname,
      phone: obj.phone,
    }
  }
  
  ngOnDestroy() {
    if(this.unsubscribe) {
      this.unsubscribe();
    }
  }
}