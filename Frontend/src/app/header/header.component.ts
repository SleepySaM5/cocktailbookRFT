import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output()
  public sidenavButtonClick = new EventEmitter<void>();
  public loggedIn: boolean;

  constructor(public dialog: MatDialog, private authService: UserService) {
    this.authService.isLoggedIn().then((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }

  // TODO

  ngOnInit() {
  }

  onSidenavButtonClick(): void {
    this.sidenavButtonClick.emit();
  }

  onLoginClick(): void {
    this.authService.facebookLogin();
  }

  onLogoutClick(): void {
    this.authService.logout();
    sessionStorage.clear();
    localStorage.clear();
  }
}
