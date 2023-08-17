import {describe, expect, it} from 'vitest';
import {fetchContributions} from './fetch_contributions';

describe('fetch contributions for user JonasDoesThings', () => {
  const TEST_USER_NAME = 'JonasDoesThings';

  it('should return the current year\'s contribution graph', async () => {
    const contributionsGraph = await fetchContributions(TEST_USER_NAME);
    expect(contributionsGraph).toBeDefined();
    expect(contributionsGraph.year).toStrictEqual(new Date().getFullYear());
    expect(contributionsGraph.username).toStrictEqual(TEST_USER_NAME);
  });

  it('should return the 2022 year\'s contribution graph', async () => {
    const contributionsGraph = await fetchContributions(TEST_USER_NAME, 2022);
    expect(contributionsGraph).toBeDefined();
    expect(contributionsGraph.year).toStrictEqual(2022);
    expect(contributionsGraph.username).toStrictEqual(TEST_USER_NAME);
    expect(contributionsGraph.contributions.length).toStrictEqual(365);
    expect(contributionsGraph.contributions.find(day => day.date === '2022-01-06')!.numberOfContributions).toStrictEqual(45);
    expect(contributionsGraph.contributions.find(day => day.date === '2022-10-23')!.numberOfContributions).toStrictEqual(13);
    expect(contributionsGraph.contributions.find(day => day.date === '2022-12-10')!.numberOfContributions).toStrictEqual(3);
    expect(contributionsGraph.contributions.find(day => day.date === '2022-12-24')!.numberOfContributions).toStrictEqual(0);
  });

  it('should return the 2020 year\'s contribution graph', async () => {
    const contributionsGraph = await fetchContributions(TEST_USER_NAME, 2020);
    expect(contributionsGraph).toBeDefined();
    expect(contributionsGraph.year).toStrictEqual(2020);
    expect(contributionsGraph.username).toStrictEqual(TEST_USER_NAME);

    // 2020 was a leap year
    expect(contributionsGraph.contributions.length).toStrictEqual(366);
    expect(contributionsGraph.contributions.find(day => day.date === '2020-12-29')!.numberOfContributions).toStrictEqual(2);
    expect(contributionsGraph.contributions.find(day => day.date === '2020-04-01')!.numberOfContributions).toStrictEqual(0);

    expect(contributionsGraph.totalNumberOfContributions).toStrictEqual(44);
  });
});
