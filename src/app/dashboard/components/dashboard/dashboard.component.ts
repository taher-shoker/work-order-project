import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isOpen: boolean = true;

  toggleBtn(e: any) {

    console.log(e);
    this.isOpen = e
  }
}
