import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'movies' },
  {
    path: 'movies',
    loadComponent: () => import('./movies/movies').then((module) => module.Movies),
  },
  { path: '**', redirectTo: 'movies' },
];
