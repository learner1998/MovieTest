import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  constructor(private movieService: MovieService) {}
  movies: any;
  ngOnInit(): void {
    this.movieService.data.subscribe((res: any) => {
      this.movies = res;
    });
  }
}
