import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { bitcoinService } from 'src/app/services/bitcoin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {

  constructor(private userService: UserService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute) { }

  start = false
  currUser!: User
  exchangeRate!: number

  async ngOnInit(): Promise<void> {
    this.currUser = this.userService.getUser()
    
    // this.currUser = this.route.snapshot.data['user'];
    this.cd.detectChanges()
    console.log('this.currUser', this.currUser );

    this.exchangeRate = await bitcoinService.getRate()

  }
}
