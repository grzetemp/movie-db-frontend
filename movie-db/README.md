# Reel Atlas

A mobile-first movie library built with Angular and Angular Material. Browse the
collection at `/movies` (also the default route), or filter by title, exact
release date, and genre.

Movie records live in `public/movies.json`. `MoviesApiService` reads this local
catalog and simulates backend latency; `MoviesStateService` debounces filter
changes, cancels stale searches, and exposes loading, result, and error states
with RxJS. The genre filter uses a fixed list in `movie.model.ts`; movie data is
expected to use only those genres.

## Development

```bash
npm start
```

## Build and tests

```bash
npm run build
npm test
```
