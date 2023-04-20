import { Component, OnInit } from '@angular/core';
import { RecensioniParserService } from '../recensioni-parser.service';
import { Recensione } from '../recensione';

@Component({
  selector: 'app-area-personale',
  templateUrl: './area-personale.component.html',
  styleUrls: ['./area-personale.component.css'],
})
export class AreaPersonaleComponent implements OnInit {

  reviews: Recensione[] = [];

  private readonly REVIEWS_FROM = 0;
  private readonly REVIEWS_TO = 10;

  constructor(private reviewParserService: RecensioniParserService) { }

  async ngOnInit() {
    this.reviews = await this.reviewParserService.retrivePersonalAreaReviews(this.REVIEWS_FROM, this.REVIEWS_TO);
  }
}
