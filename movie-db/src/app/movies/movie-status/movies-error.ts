import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movies-error',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="status-panel error-panel" role="alert">
      <span class="status-icon"><mat-icon aria-hidden="true">cloud_off</mat-icon></span>
      <h3>We couldn’t load the collection</h3>
      <p>Check your connection and give it another try.</p>
      <button mat-flat-button color="primary" type="button" (click)="retry.emit()">
        <mat-icon aria-hidden="true">refresh</mat-icon>
        Try again
      </button>
    </div>
  `,
  styleUrl: './movie-status.scss',
})
export class MoviesErrorComponent {
  readonly retry = output<void>();
}
