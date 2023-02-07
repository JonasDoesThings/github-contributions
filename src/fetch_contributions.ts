import type {ContributionsDay, ContributionsYear} from './types/contribution_year';
import {parseGitHubContributionsHTML} from './utils/contributions_parser';
import 'isomorphic-fetch';

/**
 * Fetches the contributions graph for the given GitHub username
 *
 * @param username - The username whose contribution graph will be fetched
 * @param year Optional parameter for the year of the contribution graph, if null the last 365 days from today will be fetched
 */
async function fetchContributions(username: string, year?: number): Promise<ContributionsYear> {
  if(!username || (''+username).trim().length < 1) {
    throw new TypeError('no valid username provided');
  }
  username = username.trim();


  if(year && (year <= 2000 || year >= 3000)) {
    throw new RangeError('year out of range');
  }

  const resp = await fetch(`https://github.com/users/${username}/contributions`+ (year ? `?from=${year}-12-01&to=${year}-12-01` : ''));

  if(!resp) {
    throw new Error('Failed Fetching Contributions for user, response is null');
  }
  if(!resp.ok) {
    throw new Error('Failed Fetching Contributions for user, response is not ok, statuscode=' + resp.status);
  }

  const responseHTML = await resp.text();
  const parsedContributions = parseGitHubContributionsHTML(responseHTML);
  const contributionsArray: ContributionsDay[] = Object.entries(parsedContributions).sort().map(([dayDate, dayContributionsAmount]) => {
    return {
      date: dayDate,
      numberOfContributions: dayContributionsAmount,
    };
  });

  return {
    username: username,
    year: year ?? new Date().getFullYear(),
    contributions: contributionsArray,
    totalNumberOfContributions: contributionsArray.reduce((accumulator, day) => accumulator + day.numberOfContributions, 0),
  };
}

export {fetchContributions};
