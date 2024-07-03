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

  // example html format as of 2024-07-03 for a single day entry:
  // <td tabindex="0" data-ix="1" aria-selected="false" aria-describedby="contribution-graph-legend-level-2" style="width: 10px" data-date="2022-01-03" id="contribution-day-component-1-1" data-level="2" role="gridcell" data-view-component="true" class="ContributionCalendar-day"></td>
  // <tool-tip id="tooltip-654a84c9-50b4-4058-a30a-6a606d396b3d" for="contribution-day-component-1-1" popover="manual" data-direction="n" data-type="label" data-view-component="true" class="sr-only position-absolute">6 contributions on January 3rd.</tool-tip>
  const htmlLines = rawHTML.split('\n');
  htmlLines
    .forEach((line, lineIndex) => {
      if(!line.trimStart().startsWith('<tool-tip')) return;

      const date = ISO_DATE_REGEX.exec(htmlLines[lineIndex-1])?.groups!['date'];
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
