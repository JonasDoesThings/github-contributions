# github-contributions
A simple TypeScript library to fetch GitHub's contribution chart for a user

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

## License
The project is licensed under the MIT license.    
Check the [LICENSE](./LICENSE) file, for the full legal-notice.
