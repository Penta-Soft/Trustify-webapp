import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  firstPage: number = 0;
  isMetamaskConnected: boolean = false;

  changeMetamaskState(): void {
    this.isMetamaskConnected = !this.isMetamaskConnected;
    this.firstPage = 0;
  }

}
