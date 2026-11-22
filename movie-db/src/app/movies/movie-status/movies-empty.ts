import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movies-empty',
  imports: [MatIconModule],
  template: `
    <div class="status-panel">
      <span class="status-icon"><mat-icon aria-hidden="true">search_off</mat-icon></span>
      <h3>No films found</h3>
      <p>Try another title, date, or genre to explore the collection.</p>
    </div>
  `,
  styleUrl: './movie-status.scss',
})
export class MoviesEmptyComponent {}
