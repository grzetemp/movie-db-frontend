import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { Movie, MovieFilters } from './movie.model';
import { MoviesApiService } from './movies-api.service';

export type MoviesViewState =
  { status: 'loading' } | { status: 'error' } | { status: 'success'; movies: Movie[] };

const EMPTY_FILTERS: MovieFilters = { title: '', releaseDate: '', genre: '' };

function sameFilters(left: MovieFilters, right: MovieFilters): boolean {
  return (
    left.title === right.title &&
    left.releaseDate === right.releaseDate &&
    left.genre === right.genre
  );
}

@Injectable({ providedIn: 'root' })
export class MoviesStateService {
  private readonly api = inject(MoviesApiService);
  private readonly filtersSubject = new BehaviorSubject<MovieFilters>(EMPTY_FILTERS);
  private readonly retrySubject = new Subject<void>();

  readonly viewState$: Observable<MoviesViewState> = merge(
    this.filtersSubject.pipe(debounceTime(300), distinctUntilChanged(sameFilters)),
    this.retrySubject.pipe(
      withLatestFrom(this.filtersSubject),
      map(([, filters]) => filters),
    ),
  ).pipe(
    switchMap((filters) =>
      this.api.getMovies(filters).pipe(
        map((movies): MoviesViewState => ({
          status: 'success',
          movies,
        })),
        startWith({
          status: 'loading',
        } satisfies MoviesViewState),
        catchError((error: unknown) => {
          console.error('Unable to load movies', error);
          return of({
            status: 'error',
          } satisfies MoviesViewState);
        }),
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  setFilters(filters: MovieFilters): void {
    this.filtersSubject.next(filters);
  }

  retry(): void {
    this.retrySubject.next();
  }
}
