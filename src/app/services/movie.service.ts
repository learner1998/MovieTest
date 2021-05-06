import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}
  data = new BehaviorSubject([]);
  recentSearches = new BehaviorSubject([]);

  getMovies(searchText) {
    let newRecentSearches = [...this.recentSearches.value];
    if (newRecentSearches.length > 3) {
      newRecentSearches.shift();
    }
    newRecentSearches.push(searchText);
    this.recentSearches.next(newRecentSearches);
    return this.http
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=06952d5eda1c1b29d20609da5e9d2693&query=${searchText}`
      )
      .subscribe((res: any) => {
        this.data.next([...res.results]);
      });
  }

  movies() {
    return this.data;
  }
}
