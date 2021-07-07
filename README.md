# Township Regatta Relay Task Calculator

This is a relay task points calculator for the
game [Township](https://play.google.com/store/apps/details?id=com.playrix.township&hl=en&gl=us), which will help you check
whether other teams are doing full relay task or not.

Living website:
https://township-regatta-calculator.vercel.app/

More info about the Township and regatta relay race can be found in [Here](https://township.fandom.com/wiki/Regatta)

## How to use
Visit the living website:
https://township-regatta-calculator.deeerui.com/

### Note
* If the result is `not full relay tasks`, then the team `must` not be doing full relay task.
* If the result is `maybe full relay task`, then the team still get a chance to be not doing full relay task.


## Development

This is a [Next.js](https://nextjs.org/) project
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). 

### Start the dev server:
First, run the
development server:

```bash
yarn dev
```

### Build and deploy:
```bash
yarn build
yarn start
```

### Project structure
* React components can be found under `pages/` folder.
* Core function to parse the regatta points can be found at `utils/relay.ts`

## Contribution
* If you found any issues or bugs for this app, free feel to raise an issue or pull request.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!

