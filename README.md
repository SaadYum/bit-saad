# Bands In Town App

## Prerequisites

- Latest Version of [Node](https://nodejs.org/en/) should be installed on your system.

## Basic setup

1. Clone the repo from Github.
2. Open the Repo Local Directory with any kind of your favourite Terminal e.g.cmd
3. Run command: 'npm install' (It will automatically install all the dependencies)
4. Run command: npm run dev (It'll start your development server on localhost:3000 by default)
   Thats it!!

## Architecture and TechStack

- [React.JS](https://reactjs.org/)
- [Next.JS](https://nextjs.org/)
- [Tailwind_CSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/)
- [Github](https://github.com/)
- [Netlify](https://www.netlify.com/)

## NOTES

- The Google Map component gives an alert on loading because of the lack of API key. It's just for additional purposes so I didn't bought any key. Just click OK.

## Bonus Features

### Cache

The last entered artist and events across browser reloads/refreshes persists. I used localstorage for this.

### Creative

1.  Dark Mode
2.  Additional Modal UI with Google Maps integrated. The Artist event location is located by it's Avatar Marker. You can open Modal by clicking on any event card.

### Deployment

I've setup the Github repo with Netlify. The App is live [Here](https://61f7b7434e180a0007579c80--bit-test.netlify.app/)
