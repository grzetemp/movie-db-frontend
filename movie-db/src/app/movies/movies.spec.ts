import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { MovieFiltersComponent } from './movie-filters/movie-filters';
import { MoviesStateService, MoviesViewState } from './movies-state.service';
import { Movies } from './movies';

describe('Movies filters', () => {
  it('forwards filter changes and clearing to the state service across result states', async () => {
    const viewState$ = new Subject<MoviesViewState>();
    const state = {
      viewState$,
      setFilters: vi.fn(),
      retry: vi.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [Movies],
      providers: [{ provide: MoviesStateService, useValue: state }],
    }).compileComponents();

    const fixture = TestBed.createComponent(Movies);
    fixture.detectChanges();

    expect(state.setFilters).toHaveBeenLastCalledWith({
      title: '',
      releaseDate: '',
      genre: '',
    });
    const filters = fixture.debugElement.query(By.directive(MovieFiltersComponent))
      .componentInstance as MovieFiltersComponent;
    filters.titleControl.setValue('Inception');
    filters.releaseDateControl.setValue('2010-07-16');
    filters.genreControl.setValue('Sci-Fi');
    expect(state.setFilters).toHaveBeenLastCalledWith({
      title: 'Inception',
      releaseDate: '2010-07-16',
      genre: 'Sci-Fi',
    });

    viewState$.next({ status: 'loading' });
    fixture.detectChanges();
    viewState$.next({ status: 'success', movies: [] });
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(MovieFiltersComponent)).componentInstance).toBe(
      filters,
    );
    expect(filters.titleControl.value).toBe('Inception');

    const clearButton = fixture.nativeElement.querySelector('.clear-button') as HTMLButtonElement;
    clearButton.click();
    fixture.detectChanges();
    expect(state.setFilters).toHaveBeenLastCalledWith({
      title: '',
      releaseDate: '',
      genre: '',
    });
    expect(fixture.nativeElement.querySelector('.clear-button')).toBeNull();
  });
});

describe('Movies list', () => {
  it('renders movie details and updates card positions when results change', async () => {
    const viewState$ = new Subject<MoviesViewState>();
    await TestBed.configureTestingModule({
      imports: [Movies],
      providers: [
        {
          provide: MoviesStateService,
          useValue: { viewState$, setFilters: vi.fn(), retry: vi.fn() },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(Movies);
    fixture.detectChanges();
    const first = {
      id: 'inception',
      title: 'Inception',
      releaseDate: '2010-07-16',
      director: 'Christopher Nolan',
      genres: ['Sci-Fi' as const],
    };
    const second = {
      id: 'arrival',
      title: 'Arrival',
      releaseDate: '2016-11-11',
      director: 'Denis Villeneuve',
      genres: ['Drama' as const],
    };
    viewState$.next({ status: 'success', movies: [first, second] });
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll(
      'app-movie-card',
    ) as NodeListOf<HTMLElement>;
    expect(cards.length).toBe(2);
    expect(cards[0].querySelector('h3')?.textContent).toContain('Inception');
    expect(cards[0].querySelector('.director')?.textContent).toContain('Christopher Nolan');
    expect(cards[0].querySelector('.release-date')?.textContent).toContain('Jul 16, 2010');
    expect(cards[0].querySelector('mat-chip')?.textContent).toContain('Sci-Fi');
    expect(cards[0].querySelector('.movie-art.tone-1')).not.toBeNull();

    viewState$.next({ status: 'success', movies: [second, first] });
    fixture.detectChanges();
    const reordered = fixture.nativeElement.querySelectorAll(
      'app-movie-card',
    ) as NodeListOf<HTMLElement>;
    expect(reordered[0].querySelector('h3')?.textContent).toContain('Arrival');
    expect(reordered[1].querySelector('.art-label')?.textContent).toContain('FILM NO. 2');
    expect(reordered[1].querySelector('.movie-art.tone-2')).not.toBeNull();
  });
});
