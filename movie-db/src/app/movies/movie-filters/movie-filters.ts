import { Component, DestroyRef, inject, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { combineLatest, startWith } from 'rxjs';
import { MOVIE_GENRES, MovieFilters } from '../movie.model';

@Component({
  selector: 'app-movie-filters',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './movie-filters.html',
  styleUrl: './movie-filters.scss',
})
export class MovieFiltersComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly filtersChange = output<MovieFilters>();
  readonly genres = MOVIE_GENRES;
  readonly titleControl = new FormControl('', { nonNullable: true });
  readonly releaseDateControl = new FormControl('', { nonNullable: true });
  readonly genreControl = new FormControl<MovieFilters['genre']>('', { nonNullable: true });

  ngOnInit(): void {
    combineLatest({
      title: this.titleControl.valueChanges.pipe(startWith(this.titleControl.value)),
      releaseDate: this.releaseDateControl.valueChanges.pipe(
        startWith(this.releaseDateControl.value),
      ),
      genre: this.genreControl.valueChanges.pipe(startWith(this.genreControl.value)),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((filters) => this.filtersChange.emit(filters));
  }

  get hasActiveFilters(): boolean {
    return Boolean(
      this.titleControl.value || this.releaseDateControl.value || this.genreControl.value,
    );
  }

  clearFilters(): void {
    this.titleControl.setValue('');
    this.releaseDateControl.setValue('');
    this.genreControl.setValue('');
  }
}
