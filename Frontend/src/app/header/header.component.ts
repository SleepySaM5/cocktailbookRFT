import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output()
  public sidenavButtonClick = new EventEmitter<void>();
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  onSidenavButtonClick(): void {
    this.sidenavButtonClick.emit();
  }

  openDialog() {
    this.dialog.open(LoginComponent);
  }
}
