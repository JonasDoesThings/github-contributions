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

fetchContributions("JonasDoesThings").then(contributions => {
  console.log(contributions)
});

fetchContributions("JonasDoesThings", 2021).then(contributions => {
  console.log(contributions)
});
```

## API
`fetchContributions(username [string], <optional: year [number]>)`  
Returns: `Promise<ContributionsYear>`
## License
The project is licensed under the MIT license.    
Check the [LICENSE](./LICENSE) file, for the full legal-notice.
