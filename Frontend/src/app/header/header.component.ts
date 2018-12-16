import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output()
  public sidenavButtonClick = new EventEmitter<void>();
  public loggedIn: boolean;
  public user = null;

  constructor(private authService: UserService,
              private router: Router) {
    this.authService.isLoggedIn().then((loggedIn) => {
      this.loggedIn = loggedIn;
      if (loggedIn) {
        this.authService.getCurrentUser().then((user) => {
          this.user = user;
        });
      }
    });

    this.authService.loginFinished.subscribe((loginFinished) => {
      console.log('login finished');
      console.log('the new user is: ', this.authService.currentUser);
      this.authService.getCurrentUser().then((user) => {
        this.loggedIn = true;
        this.user = user;
      });
      this.router.navigate([this.router.url + '/?refresh=1']);
    });
  }

  ngOnInit() {
  }

  onSidenavButtonClick(): void {
    this.sidenavButtonClick.emit();
  }

  onLoginClick(): void {
    this.authService.facebookLogin().then(() => {
      this.router.navigate([this.router.url + '/?refresh=1']);
    });
  }

  onLogoutClick(): void {
    this.authService.logout();
    window.location.reload();
    sessionStorage.clear();
    localStorage.clear();
  }
}
