import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-index',
  templateUrl: './contact-index.component.html',
  styleUrls: ['./contact-index.component.scss']
})
export class ContactIndexComponent {

  constructor(private contactService: ContactService, private router: Router) { }

  contacts!: Contact[]
  contacts$!: Observable<Contact[]>
  subscription!: Subscription
  prm = Promise.resolve('Resolved!')

  ngOnInit(): void {
    this.contactService.loadContacts()
    this.contacts$ = this.contactService.contacts$

  }

  onRemoveContact(contactId: string) {
    this.contactService.deleteContact(contactId)
  }


}
