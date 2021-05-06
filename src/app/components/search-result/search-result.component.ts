import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  constructor(private movieService: MovieService) {}
  default = false;
  movies: any;
  defaultImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png';
  ngOnInit(): void {
    this.movieService.data.subscribe((res: any) => {
      if (res.poster_path == undefined) {
        res.poster_path = this.defaultImage;
      }
      this.movies = res;
    });
  }
}
