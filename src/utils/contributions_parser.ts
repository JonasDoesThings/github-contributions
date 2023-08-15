const ISO_DATE_REGEX = /data-date="(?<date>\d{4}-\d{2}-\d{2})"/;
const CONTRIBUTIONS_COUNT_REGEX = /(?<contributionscount>No|\d+) contribution(s?) on /;

/**
 * utility function to parse the scraped HTML into a map with the ISO-8601 formatted date as key,
 * and the number of contributions on this day as value
 *
 * @param rawHTML
 */
function parseGitHubContributionsHTML(rawHTML: string) {
  const contributions: {[key: string]: number} = {};

  const htmlLines = rawHTML.split('\n');
  htmlLines
    .filter(line => line.trimStart().startsWith('<td'))
    .forEach(line => {
      const date = ISO_DATE_REGEX.exec(line)?.groups!['date'];
      if(!date) {
        return;
      }

      const contributionsCount = CONTRIBUTIONS_COUNT_REGEX.exec(line)?.groups!['contributionscount'];
      if(!contributionsCount) {
        return;
      }

      contributions[date] = contributionsCount === 'No' ? 0 : parseInt(contributionsCount);
    });

  return contributions;
}

export {parseGitHubContributionsHTML};
