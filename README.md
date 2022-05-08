# MORSE
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/V7V46KBQ9)

Daily challenge games. You need to decode a message transmitted in Morse via websocket.

The project has an educational purpose.
This is the back-end application of the Morse game.

The project must be accessible and simple. It is for this reason that it uses a JSON file as a database (the volume of information to be saved allowing it).

The project does not use ESM modules to be easily deployable on shared solutions using servers like [Phusion Passenger](https://www.phusionpassenger.com/).

## Point of complexity

### data sources
In order not to store a game answer in the repository, an external data source has been added: [TMDB](https://developers.themoviedb.org/3).

Access to this API is free but requires a key. 

You can very well replace this source with another external solution or local data, see connect a database.

## Front end
The front-end project is available on this [repository](https://github.com/kazerlelutin/front-morse).

## Launch tests
The application uses [Jest](https://jestjs.io) for these unit tests.

## launch project

In local (watch files change): 
```
npm run dev
```

In production: 

```
npm run start
```