# Reel Atlas

A mobile-first movie library built with Angular and Angular Material. The
collection is available at `/movies`, which is also the default route.

Movie records live in `public/movies.json`. `MoviesApiService` reads the local
catalog and simulates a two-second backend delay. The genre filter uses the
fixed list in `movie.model.ts`; movie data is expected to use only those genres.

## Development

```bash
npm install
npm start
```

Open `http://localhost:4200/` in your browser.

## Build

```bash
npm run build
```
