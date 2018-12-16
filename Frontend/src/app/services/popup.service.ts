import { Injectable } from '@angular/core';
import { Popup } from '../models/popup.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  popup: Popup;
  popupSubject: Subject<Popup>;

  constructor() {
    this.popupSubject = new Subject();
  }

  openDialogWith(popup: Popup): void {
    this.popupSubject.next(popup);
  }

}
