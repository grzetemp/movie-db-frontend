import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieFilters } from './movie.model';
import { MovieCardComponent } from './movie-card/movie-card';
import { MovieFiltersComponent } from './movie-filters/movie-filters';
import { MoviesStateService } from './movies-state.service';

@Component({
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MovieCardComponent,
    MovieFiltersComponent,
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
