import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {

  constructor(private userService: UserService) { }

  user!: any

  async ngOnInit(): Promise<void> {
    this.user = this.userService.getUser()
  }
}
