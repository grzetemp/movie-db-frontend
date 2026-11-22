import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MovieFilters } from './movie.model';
import { MovieCardComponent } from './movie-card/movie-card';
import { MovieFiltersComponent } from './movie-filters/movie-filters';
import { MoviesEmptyComponent } from './movie-status/movies-empty';
import { MoviesErrorComponent } from './movie-status/movies-error';
import { MoviesLoadingComponent } from './movie-status/movies-loading';
import { MoviesStateService } from './movies-state.service';

@Component({
  imports: [
    AsyncPipe,
    MovieCardComponent,
    MovieFiltersComponent,
    MoviesEmptyComponent,
    MoviesErrorComponent,
    MoviesLoadingComponent,
  ],
  selector: 'app-movies',
  styleUrl: './movies.scss',
  templateUrl: './movies.html',
})
export class Movies {
  private readonly moviesState = inject(MoviesStateService);

  readonly viewState$ = this.moviesState.viewState$;

  setFilters(filters: MovieFilters): void {
    this.moviesState.setFilters(filters);
  }

  retry(): void {
    this.moviesState.retry();
  }
}
