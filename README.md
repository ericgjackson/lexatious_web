# lexatious_web

<div align="center">
<img alt="Lexatious logo" height="80" src="https://raw.githubusercontent.com/ericgjackson/lexatious_web/main/imgs/logo.png" />
</div>

Lexatious is a novel word game, somewhat similar to Scrabble.  This repo implements the web
front end to Lexatious.  Visit
<a href="https://lexatious.com">lexatious.com</a> to play Lexatious in your browser.

Apps are also available for Android and iOS:

<a href="https://apps.apple.com/us/app/lexatious/id1614332855">
<img alt="App Store" height="60" src="https://github.com/ericgjackson/lexatious_web/blob/main/src/icons/AppStore.svg"/>
</a>

<a href="https://play.google.com/store/apps/details?id=com.egjackson.lexatious">
<img alt="Play Store" height="60" src="https://github.com/ericgjackson/lexatious_web/blob/main/src/icons/PlayStore.svg"/>
</a>

## Develop

You need Node.js 16 or later.

### Back End

The back end for Lexatious is not currently open source which makes it tricky for anyone other than the author to do development.  It may work to edit `src/sdk/fetch.ts` to ensure that backend calls are sent to the production server at lexatious.com.

### Setup

```
npm install
```

### Dev Server

```
npm run dev
```

Runs a dev system with hot reloading.  Accessible at localhost:3000.

### Linting

```
npm run lint
```

### Building

```
npm run build
npm run export
```

Output is to the "out" directory.

## Acknowledgments

The user interface and source code for the web front end is based on&nbsp;
<a href="https://scrabble-solver.org" target="_blank" rel="noopener noreferrer">
Scrabble Solver 2</a>&nbsp;by&nbsp;
<a href="https://kamilmielnik.com" target="_blank" rel="noopener noreferrer">Kamil Mielnik</a>.
