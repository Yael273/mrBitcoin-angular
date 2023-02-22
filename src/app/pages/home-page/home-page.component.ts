import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/services/bitcoin.service';
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
    public bitcoinService: BitcoinService,
    private route: ActivatedRoute) { }

  start = false
  currUser!: User
  exchangeRate!: number
  rate$!: Observable<string>

  async ngOnInit(): Promise<void> {
    this.currUser = this.userService.getUser()
    this.rate$ = this.bitcoinService.getRateStream()
  }
}
