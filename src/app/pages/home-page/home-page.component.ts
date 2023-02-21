import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { bitcoinService } from 'src/app/services/bitcoin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  constructor(private userService: UserService) { }

  start = false
  // currUser!: User[]
  currUser!: any
  exchangeRate!: number

  async ngOnInit(): Promise<void> {
    this.currUser = this.userService.getUser()
    console.log('this.currUser', this.currUser);

      this.exchangeRate = await bitcoinService.getRate()

  }
}
