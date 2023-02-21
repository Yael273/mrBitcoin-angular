import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  contact!: Contact
  subscription!: Subscription

  async ngOnInit() {
    this.subscription = this.route.data.subscribe(data => {
      this.contact = data['contact']
    })

  }

  onBack() {
    this.router.navigateByUrl('/contact')
    // this.router.navigate(['/'])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
