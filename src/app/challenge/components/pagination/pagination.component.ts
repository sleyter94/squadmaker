import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  ngOnInit(): void {


  }

  @Input("total") totalRecords = 0;
  @Input("per-page") recordsPerPage = 0;

  @Output("change") onPageChange: EventEmitter<number> = new EventEmitter();

  public pages: number [] = [];
  activePage: number = 1;

  ngOnChanges(): any {
    const pageCount = this.getPageCount();
    if(localStorage.getItem('page')) {
      this.activePage = parseInt(localStorage.getItem('page') || '1');
    }else{
      this.activePage = 1;
    }
    this.onPageChange.emit(this.activePage);
  }

  getPageCount(): number {
    let totalPage = 0;

    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);

      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPage;
  }

  onClickPage(pageNumber: number): void {
      if (pageNumber >= 1 && pageNumber <= this.getPageCount()) {
          this.activePage = pageNumber;
          this.onPageChange.emit(this.activePage);
      }
  }

}
