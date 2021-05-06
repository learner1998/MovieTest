import { MovieService } from './../../services/movie.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private router: Router, private movieService: MovieService) {}
  data = [];
  recentSearches = [];
  toggleNumber() {
    let showNum = document.getElementById('show-numbers');
    let showAlph = document.getElementById('show-alphabets');
    let value = showNum.style.getPropertyValue('display');
    if (value === 'none') {
      showNum.style.display = 'inline';
      showAlph.style.display = 'none';
    } else {
      showNum.style.display = 'none';
      showAlph.style.display = 'inline';
    }
  }

  ngOnInit(): void {
    this.searchString = '';
    this.movieService.recentSearches.subscribe((res) => {
      this.recentSearches = res;
    });
  }
  searchString = '';
  catchAlphabet(e) {
    if (!e.toElement.firstChild) {
      return;
    }
    let LetterVal = e.toElement.firstChild.data;
    if (LetterVal === undefined) {
      return;
    }

    if (LetterVal === '123') {
      return;
    }
    if (LetterVal === '& ABC') {
      return;
    }
    if (LetterVal === 'SPACE') {
      this.searchString += ' ';
      return;
    }
    if (LetterVal === 'CLEAR') {
      this.searchString = '';
    }
    if (LetterVal === 'SEARCH') {
      this.submitSearch();
      return;
    } else {
      this.searchString += LetterVal;
    }
  }

  removeLast() {
    if (this.searchString) {
      this.searchString = this.searchString.slice(0, -1);
    }
  }

  submitSearch() {
    this.movieService.getMovies(this.searchString);
    this.router.navigate(['/search-results']);
  }
}
