import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { Move, User } from 'src/app/models/user.model';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

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
    private location: Location,
    private userService: UserService
  ) { }

  user !: User
  moves !: Move[]
  contact!: Contact
  subscription!: Subscription

  async ngOnInit() {
    this.subscription = this.route.data.subscribe(data => {
      this.contact = data['contact']
    })
    this.updateMoves()
  }
  updateMoves() {
    this.user = this.userService.getUser()
    this.moves = this.user.moves.filter(move => move.toId === this.contact._id)
  }

  onBack() {
    this.router.navigateByUrl('/contact')
    // this.router.navigate(['/'])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
