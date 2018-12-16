import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showBg = false;

  constructor(  private route: ActivatedRoute,
                private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      if (this.router.url === '/') {
        this.showBg = true;
      } else {
        this.showBg = false;
      }
    });
  }

}
