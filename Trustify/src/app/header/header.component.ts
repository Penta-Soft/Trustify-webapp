import { Component, OnInit, } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMetamaskConnected: boolean = false;
  currentIndex: number = 0;

  ngOnInit() {
    if (localStorage.getItem("login") === "true") {
      this.isMetamaskConnected = true;
    }
    let index = localStorage.getItem("index");
    this.currentIndex = index !== null ? parseInt(index) : 0;
  }

  updateCurrentIndex(index: number): void {
    this.currentIndex = index;
    localStorage.setItem("index", index.toString());
  }

  changeMetamaskState(): void {
    this.isMetamaskConnected = !this.isMetamaskConnected;

    if (this.isMetamaskConnected) {
      localStorage.setItem("login", "true");
    } else {
      localStorage.setItem("login", "false");
    }

    this.currentIndex = 0;
  }

}
