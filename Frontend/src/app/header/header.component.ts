import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from "../services/popup.service";
import { Popup } from "../models/popup.model";

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
              public dialog: MatDialog,
              private popupService: PopupService) {
    this.authService.isLoggedIn().then((loggedIn) => {
      this.loggedIn = loggedIn;
      if (loggedIn) {
        this.authService.getCurrentUser().then((user) => {
          this.user = user;
        });
      }
    });
  }

  ngOnInit() {
  }

  onPopupClick(): void {
    this.popupService.openDialogWith(new Popup('Something went wrong :(', 'Could not log in! Please try again later!'));
    this.dialog.open(PopupComponent);
  }

  onSidenavButtonClick(): void {
    this.sidenavButtonClick.emit();
  }

  onLoginClick(): void {
    this.authService.facebookLogin()
      .then(() => console.log('logged in'))
      .catch(() => {
        this.popupService.openDialogWith(new Popup('Something went wrong :(', 'Could not log in! Please try again later!'))
        this.dialog.open(PopupComponent);
      });
  }

  onLogoutClick(): void {
    this.authService.logout();
    window.location.reload();
    sessionStorage.clear();
    localStorage.clear();
  }
}
