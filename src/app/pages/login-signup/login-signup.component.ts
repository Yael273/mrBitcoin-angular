import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent {

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  start = false
  logo = 'Mr. Bitcoin'
  intro = 'An innovative payment network and a new kind of money.'
  user!: User

  ngOnInit(): void {
    this.user = this.userService.getEmptyCredentials()
    console.log('this.user', this.user);
    
  }

  onAddUser() {
    this.userService.signup(this.user)
    this.router.navigateByUrl('/home')
  }


}
