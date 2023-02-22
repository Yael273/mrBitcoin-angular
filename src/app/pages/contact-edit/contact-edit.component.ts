import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent {
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  contact!: Contact
  subscription!: Subscription


  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(({ contact }) => {
      console.log('contact', contact);
      
      this.contact = contact || this.contactService.getEmptyContact() as Contact
    })
    // this.subscription = this.route.params.subscribe(async ({ id }) => {
    //   this.contact = id ?
    //     await lastValueFrom(this.contactService.getContactById(id)) :
    //     this.contactService.getEmptyContact() as Contact
    // })


  }

  async onAddContact() {
    try {
      const contact = { ...this.contact}
      this.contactService.saveContact(contact)
      this.onBack()
  } catch (err) {
      console.error(err)
  }

  }

  onBack() {
    this.router.navigateByUrl('/contact')
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}


// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { lastValueFrom, Subscription } from 'rxjs';
// import { Contact } from 'src/app/models/contact.model';
// import { ContactService } from 'src/app/services/contact.service';

// @Component({
//   selector: 'contact-edit',
//   templateUrl: './contact-edit.component.html',
//   styleUrls: ['./contact-edit.component.scss']
// })
// export class ContactEditComponent {
//   constructor(
//     private contactService: ContactService,
//     private route: ActivatedRoute,
//     private router: Router,
//     private fb: FormBuilder) {
//     this.form = this.fb.group({
//       name: ['', [Validators.required]],
//       email: '',
//       phone: ''
//     })
//   }

//   form !: FormGroup
//   contact: Contact | undefined
//   subscription!: Subscription

//   ngOnInit(): void {

//     this.subscription = this.route.data.subscribe(({ contact }) => {
//       if (contact) {
//         this.contact = contact
//         this.form.patchValue(contact)
//       }
//     })

//     // this.subscription = this.route.data.subscribe(({ contact }) => {
//     //   console.log('contact', contact);

//     //   this.contact = contact || this.contactService.getEmptyContact() as Contact
//     // })
//     // this.subscription = this.route.params.subscribe(async ({ id }) => {
//     //   this.contact = id ?
//     //     await lastValueFrom(this.contactService.getContactById(id)) :
//     //     this.contactService.getEmptyContact() as Contact
//     // })


//   }

//   async onAddContact() {
//     try {
//       const contact = { ...this.contact, ...this.form.value }
//       this.contactService.saveContact(contact)
//       this.router.navigateByUrl('/contact')
//     } catch (err) {
//       console.error(err)
//     }

//   }

//   onBack() {
//     this.router.navigateByUrl('/contact')
//   }

//   ngOnDestroy(): void {
//     this.subscription.unsubscribe()
//   }
// }

