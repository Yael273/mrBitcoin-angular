import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ex-mrBitcoin';

  selectedCmp = 'home-page';

  selectCmp(cmpName: string) {
    this.selectedCmp = cmpName;
  }

  showCmp(cmpName: string) {
    return this.selectedCmp === cmpName;
  }
}
