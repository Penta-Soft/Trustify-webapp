import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecensioniParserService } from '../recensioni-parser.service';
import { Recensione } from '../recensione';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  form: FormGroup = new FormGroup({});
  reviews: Recensione[] = [
    new Recensione("a", 2, "A", "0x"),
    new Recensione("a", 2, "A", "0x"),
    new Recensione("a", 2, "A", "0x"),
    new Recensione("a", 2, "A", "0x"),
    new Recensione("a", 2, "A", "0x"),
    new Recensione("a", 2, "A", "0x"),
    new Recensione("b", 2, "b", "0x"),
    new Recensione("b", 2, "b", "0x"),
    new Recensione("b", 2, "b", "0x"),
    new Recensione("b", 2, "b", "0x"),
    new Recensione("b", 2, "b", "0x"),
    new Recensione("b", 2, "b", "0x"),
    new Recensione("b", 2, "b", "0x"),

  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource: MatTableDataSource<Recensione> = new MatTableDataSource<Recensione>(this.reviews)

  private readonly ADDRESS_VALIDATOR_PATTERN = '^0x[a-fA-F0-9]{40}$';

  private readonly DEFAULT_ADDRESS =
    '0x73A31b79043c11ec8E9B453625f42388E5D1b797';
  private readonly REVIEWS_FROM = 0;
  private readonly REVIEWS_TO = 10;

  constructor(
    private formBuilder: FormBuilder,
    private reviewParserService: RecensioniParserService,
    private snackBar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      address: [
        null,
        [
          Validators.required,
          Validators.pattern(this.ADDRESS_VALIDATOR_PATTERN),
        ],
      ],
    });

    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();

    //this.getCompanyReview(this.DEFAULT_ADDRESS);
  }

  onSubmit(form: any) {
    this.getCompanyReview(form.value.address);
  }

  async getCompanyReview(address: string) {
    try {
      this.reviews = await this.reviewParserService.retriveHomePageReviews(
        this.REVIEWS_FROM,
        this.REVIEWS_TO,
        address
      );
    } catch (error: any) {
      this.snackBar.open(error.message, 'Chiudi', { duration: 5000 });
      this.reviews = [];
    }
  }
}
