interface ContributionsYear {
  // The username to whom the contribution graph belongs
  username: string;
  // The main-year to fetch, if the requested period spans two years the latter one will be used
  year: number;
  // Each day of the year-period sorted so that the oldest day is on the first position of this array
  contributions: ContributionsDay[];
  // The total number of contributions in the requested year-period
  totalNumberOfContributions: number;
}

interface ContributionsDay {
  // ISO-8601 formatted date string (YYYY-MM-DD)
  date: string;
  // The number of visible contributions on this day
  numberOfContributions: number;
}

export type {ContributionsYear, ContributionsDay};
