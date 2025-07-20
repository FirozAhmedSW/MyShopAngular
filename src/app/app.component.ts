import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularApp';
  AccountIsLogind: boolean = false;

  constructor(private services: ApiService) {}

  ngOnInit(): void {
    debugger
    this.AccountIsLogind = this.services.IsloginCheack();

    this.services.isloginSubject.subscribe((res: boolean) => {
      this.AccountIsLogind = res;
    });
  }
}
