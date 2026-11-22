import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-card',
  imports: [DatePipe, MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCardComponent {
  readonly movie = input.required<Movie>();
  readonly index = input.required<number>();
}
