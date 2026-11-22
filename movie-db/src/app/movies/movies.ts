import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MovieCardComponent } from './movie-card/movie-card';
import { MovieFiltersComponent } from './movie-filters/movie-filters';
import { MoviesApiService } from './movies-api.service';

@Component({
  imports: [MovieCardComponent, MovieFiltersComponent],
  selector: 'app-movies',
  styleUrl: './movies.scss',
  templateUrl: './movies.html',
})
export class Movies {
  private readonly moviesApi = inject(MoviesApiService);

  readonly movies = toSignal(this.moviesApi.getMovies({ title: '', releaseDate: '', genre: '' }), {
    initialValue: [],
  });
}
