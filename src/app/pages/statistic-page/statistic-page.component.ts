import { Component } from '@angular/core';

@Component({
  selector: 'statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss']
})
export class StatisticPageComponent {
  selectedCmp = 'avg';

  selectCmp(cmpName: string) {
    this.selectedCmp = cmpName;
  }

  showCmp(cmpName: string) {
    return this.selectedCmp === cmpName;
  }
}
