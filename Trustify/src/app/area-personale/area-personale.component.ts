import { Component} from '@angular/core';

@Component({
  selector: 'app-area-personale',
  templateUrl: './area-personale.component.html',
  styleUrls: ['./area-personale.component.css'],
})
export class AreaPersonaleComponent {
  rating: number = 3;
  starCount: number = 5;
  reviewCheck: boolean = true;

  constructor() {}


  //     for(let i=0; i<address.length; i++) {
  //       let li = document.createElement("li");
  //       li.setAttribute("id", "element"+i);
  //       li.appendChild(document.createTextNode(address[i]+' '+stars[i]+' '+strValue[i]));
  //       ul.appendChild(li);
  //     }
  //     this.reviewCheck = false;
  //   } else {
  //     while(ul.firstChild) {
  //       ul.removeChild(ul.firstChild);
  //     }
  //     this.reviewCheck = true;
  //   }
  // }

}
