import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { Move, User } from 'src/app/models/user.model';
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
  contact !: Contact
  exchangeRate!: number
  rate$!: Observable<string>
  moves !: Move[]

  async ngOnInit(): Promise<void> {
    this.currUser = this.userService.getUser()
    this.rate$ = this.bitcoinService.getRateStream()
  }

  getLastMoves() {
    const movesDate = this.currUser.moves.map(move =>{
      return move.at
    })
    const sortedMoves = movesDate.sort((a,b) => a - b)
    const lastSortedMove = sortedMoves.length - 1
    const moves = this.currUser.moves
    // return [moves[lastSortedMove], moves[lastSortedMove - 1], moves[lastSortedMove - 2]]
    if (moves.length === 1) return [moves[lastSortedMove]]
    else if (moves.length === 2) return [moves[lastSortedMove], moves[lastSortedMove - 1]]
    else return [moves[lastSortedMove], moves[lastSortedMove - 1], moves[lastSortedMove - 2]]
  }

}
