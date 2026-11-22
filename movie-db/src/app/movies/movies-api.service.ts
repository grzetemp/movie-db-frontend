import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { delay, map, Observable, shareReplay } from 'rxjs';
import { Movie, MovieFilters } from './movie.model';

const MOCK_API_DELAY_MS = 2000;

@Injectable({ providedIn: 'root' })
export class MoviesApiService {
  private readonly http = inject(HttpClient);
  private readonly catalog$ = this.http
    .get<Movie[]>('/movies.json')
    .pipe(shareReplay({ bufferSize: 1, refCount: false }));

  getMovies(filters: MovieFilters): Observable<Movie[]> {
    return this.catalog$.pipe(
      delay(MOCK_API_DELAY_MS),
      map((movies) => {
        const title = filters.title.trim().toLocaleLowerCase();
        return movies.filter((movie) => {
          const matchesTitle = movie.title.toLocaleLowerCase().includes(title);
          const matchesDate = !filters.releaseDate || movie.releaseDate === filters.releaseDate;
          const matchesGenre = !filters.genre || movie.genres.includes(filters.genre);

          return matchesTitle && matchesDate && matchesGenre;
        });
      }),
    );
  }
}
