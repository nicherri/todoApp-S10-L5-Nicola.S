import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  show:boolean = false;
  constructor(private searchService: SearchService) {}

  onSearch(term: string): void {
    console.log('Search term:', term);
    this.searchService.setSearchTerm(term);
  }
}
