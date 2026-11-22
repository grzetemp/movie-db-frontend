import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-movies-loading',
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="status-panel" role="status">
      <mat-spinner diameter="38" aria-label="Loading movies"></mat-spinner>
      <p>Finding your next great watch&#8230;</p>
    </div>
  `,
  styleUrl: './movie-status.scss',
})
export class MoviesLoadingComponent {}
