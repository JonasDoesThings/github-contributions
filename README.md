# github-contributions
**A simple TypeScript library to fetch GitHub's contribution chart for a user**

[![LICENSE](https://img.shields.io/npm/l/@jonasdoesthings/github-contributions?color=%2384cc16&style=flat-square)](./LICENSE)
[![npm version](https://img.shields.io/npm/v/@jonasdoesthings/github-contributions?color=84cc16&style=flat-square)](https://www.npmjs.com/package/@jonasdoesthings/github-contributions/)


## Installation
`npm install @jonasdoesthings/github-contributions`  
or  
`yarn add @jonasdoesthings/github-contributions`

## Usage
```typescript
import {fetchContributions} from '@jonasdoesthings/github-contributions';

fetchContributions("JonasDoesThings").then((contributionsYear) => {
  console.log(contributionsYear);
  console.log(contributionsYear.contributions[14].numberOfContributions);
});

fetchContributions("JonasDoesThings", 2021).then((contributionsYear) => {
  console.log(contributionsYear.totalNumberOfContributions);
  console.log(contributionsYear.contributions.find((day) => day.date === '2021-08-29')?.numberOfContributions);
});
```

## API
`fetchContributions(username [string], <optional: year [number]>)`  
Returns: `Promise<ContributionsYear>`.  
  
See [src/types/contribution_year.ts](src/types/contribution_year.ts) for the type definition.  

## Testing
Run `yarn test` to execute all tests.

## License
The project is licensed under the MIT license.    
Check the [LICENSE](./LICENSE) file, for the full legal-notice.
