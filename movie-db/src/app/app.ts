import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  imports: [MatProgressSpinnerModule],
  selector: 'app-root',
  styleUrl: './app.sass',
  templateUrl: './app.html',
})
export class App {}
