import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PopupService } from '../services/popup.service';
import { Popup } from '../models/popup.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  popup: Popup = {errorTitle: 'default title', errorMessage: 'default message'};

  constructor(popupService: PopupService, private cdRef: ChangeDetectorRef) {
    console.log(popupService);
    popupService.popupSubject.subscribe((popup) => {
      this.popup = popup;

      this.cdRef.detectChanges();
    });
  }

  ngOnInit() {
  }

}
